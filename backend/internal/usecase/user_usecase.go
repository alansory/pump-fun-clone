package usecase

import (
	"backend/internal/entity"
	"backend/internal/entity/converter"
	"backend/internal/gateway/messaging"
	"backend/internal/model"
	"backend/internal/repository"
	"backend/internal/utils"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgconn"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserUseCase struct {
	DB             *gorm.DB
	Log            *logrus.Logger
	Validate       *validator.Validate
	UserRepository *repository.UserRepository
	UserProducer   *messaging.UserProducer
}

func NewUserUseCase(db *gorm.DB, logger *logrus.Logger, validate *validator.Validate,
	userRepository *repository.UserRepository, userProducer *messaging.UserProducer) *UserUseCase {
	return &UserUseCase{
		DB:             db,
		Log:            logger,
		Validate:       validate,
		UserRepository: userRepository,
		UserProducer:   userProducer,
	}
}

func (c *UserUseCase) ValidateRequest(ctx *fiber.Ctx, request interface{}) error {
	err := c.Validate.Struct(request)
	if err != nil {
		// Jika error adalah ValidationErrors, format error-nya
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errors := make([]map[string]string, 0)

			for _, fieldErr := range validationErrors {
				// Buat pesan error yang lebih spesifik
				message := fmt.Sprintf("Validation failed on '%s' condition", fieldErr.Tag())
				if fieldErr.Tag() == "email" {
					message = fmt.Sprintf("Email '%v' is invalid", fieldErr.Value())
				} else if fieldErr.Tag() == "required" {
					message = fmt.Sprintf("Field '%s' is required", fieldErr.Field())
				} else if fieldErr.Tag() == "min" {
					message = fmt.Sprintf("Field '%s' must be at least %s characters long", fieldErr.Field(), fieldErr.Param())
				} else if fieldErr.Tag() == "max" {
					message = fmt.Sprintf("Field '%s' must be at most %s characters long", fieldErr.Field(), fieldErr.Param())
				}

				errors = append(errors, map[string]string{
					"field":   fieldErr.Field(),
					"message": message,
				})
			}

			// Encode error validasi sebagai JSON string
			errorJSON, _ := json.Marshal(errors)
			return fiber.NewError(fiber.StatusUnprocessableEntity, string(errorJSON))
		}

		// Kembalikan error lainnya sebagai fiber.Error
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return nil
}

// func (c *UserUseCase) Verify(ctx context.Context, request *model.VerifyUserRequest) (*model.Auth, error) {
// 	tx := c.DB.WithContext(ctx).Begin()
// 	defer tx.Rollback()

// 	err := c.Validate.Struct(request)
// 	if err != nil {
// 		c.Log.Warnf("Invalid request body : %+v", err)
// 		return nil, fiber.ErrBadRequest
// 	}

// 	user := new(entity.User)
// 	if err := c.UserRepository.FindByToken(tx, user, request.Token); err != nil {
// 		c.Log.Warnf("Failed find user by token : %+v", err)
// 		return nil, fiber.ErrNotFound
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		c.Log.Warnf("Failed commit transaction during user verification : %+v", err)
// 		return nil, fiber.ErrInternalServerError
// 	}

// 	return &model.Auth{ID: user.ID}, nil
// }

func (c *UserUseCase) Create(ctx *fiber.Ctx, request *model.RegisterUserRequest) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx.UserContext()).Begin()
	defer tx.Rollback()

	// Hash the password
	password, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		c.Log.Warnf("Failed to generate bcrypt hash: %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to hash password")
	}

	// Create the user entity
	user := &entity.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: string(password),
		Address:  request.Address,
	}

	// Save the user to the database
	if err := c.UserRepository.Create(tx, user); err != nil {
		c.Log.Warnf("Failed to create user in database: %+v", err)

		// Check for duplicate key error using pgconn.PgError
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" { // PostgreSQL duplicate key error code
			// Log the full error for debugging
			c.Log.Warnf("PostgreSQL error: %+v", pgErr)

			// Check which unique constraint was violated
			if strings.Contains(pgErr.ConstraintName, "users_email_key") {
				c.Log.Warnf("Email duplicate key")
				return nil, fiber.NewError(fiber.StatusConflict, "Email already exists")
			} else if strings.Contains(pgErr.ConstraintName, "users_address_key") {
				c.Log.Warnf("Address duplicate key")
				return nil, fiber.NewError(fiber.StatusConflict, "Address already exists")
			}

			// Default message for other unique constraints
			c.Log.Warnf("Duplicate key error on constraint: %s", pgErr.ConstraintName)
			return nil, fiber.NewError(fiber.StatusConflict, "Duplicate key error")
		}

		// Fallback: Check error message manually if pgErr.ConstraintName is empty
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			if strings.Contains(err.Error(), "users_email_key") {
				c.Log.Warnf("Email duplicate key (fallback)")
				return nil, fiber.NewError(fiber.StatusConflict, "Email already exists")
			} else if strings.Contains(err.Error(), "users_address_key") {
				c.Log.Warnf("Address duplicate key (fallback)")
				return nil, fiber.NewError(fiber.StatusConflict, "Address already exists")
			}

			// Default message for other unique constraints
			c.Log.Warnf("Duplicate key error (fallback)")
			return nil, fiber.NewError(fiber.StatusConflict, "Duplicate key error")
		}

		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create user")
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed to commit transaction: %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to commit transaction")
	}

	// Publish user created event
	event := converter.UserToEvent(user)
	c.Log.Info("Publishing user created event")
	if err := c.UserProducer.Send(event); err != nil {
		c.Log.Warnf("Failed to publish user created event: %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to publish event")
	}

	return converter.UserToResponse(user), nil
}

func (c *UserUseCase) Login(ctx context.Context, request *model.LoginUserRequest) (*model.UserResponse, error) {
	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body  : %+v", err)
		return nil, fiber.ErrBadRequest
	}

	user := new(entity.User)
	if err := c.UserRepository.FindByEmail(c.DB, user, request.Email); err != nil {
		c.Log.Warnf("Failed find user by email : %+v", err)
		return nil, fiber.ErrUnauthorized
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
		c.Log.Warnf("Failed to compare user password with bcrype hash : %+v", err)
		return nil, fiber.ErrUnauthorized
	}

	event := converter.UserToEvent(user)
	c.Log.Info("Publishing user created event")
	if err := c.UserProducer.Send(event); err != nil {
		c.Log.Warnf("Failed publish user created event : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.UserToResponse(user), nil
}

func (c *UserUseCase) Web3Login(ctx context.Context, request *model.Web3LoginRequest) (*model.UserResponse, error) {
	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.ErrBadRequest
	}

	isValid, err := utils.VerifiWeb3Signature(request.Address, request.Signature, request.Message, request.Chain)
	if err != nil || !isValid {
		c.Log.Warnf("Failed to verify web3 login : %+v", err)
		return nil, fiber.ErrUnauthorized
	}

	user := new(entity.User)
	if err := c.UserRepository.FindOrCreateUserByAddress(c.DB, user, request.Address); err != nil {
		c.Log.Warnf("Failed find user by address : %+v", err)
		return nil, fiber.ErrUnauthorized
	}

	event := converter.UserToEvent(user)
	c.Log.Info("Publishing user created event")
	if err := c.UserProducer.Send(event); err != nil {
		c.Log.Warnf("Failed publish user created event : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.UserToResponse(user), nil
}
