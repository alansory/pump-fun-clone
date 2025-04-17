package controller

import (
	"backend/internal/model"
	"backend/internal/usecase"
	"backend/internal/utils"
	"encoding/json"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type UserController struct {
	Log     *logrus.Logger
	UseCase *usecase.UserUseCase
}

func NewUserController(useCase *usecase.UserUseCase, logger *logrus.Logger) *UserController {
	return &UserController{
		Log:     logger,
		UseCase: useCase,
	}
}

func (c *UserController) Register(ctx *fiber.Ctx) error {
	request := new(model.RegisterUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	if err := c.UseCase.ValidateRequest(ctx, request); err != nil {
		if fiberErr, ok := err.(*fiber.Error); ok {
			var validationErrors []map[string]string
			if parseErr := json.Unmarshal([]byte(fiberErr.Message), &validationErrors); parseErr == nil {
				return utils.JSONResponse(ctx, fiberErr.Code, "Validation error", nil, validationErrors)
			}
			return utils.JSONResponse(ctx, fiberErr.Code, fiberErr.Message, nil, nil)
		}
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Internal server error", nil, err.Error())
	}

	response, err := c.UseCase.Create(ctx, request)
	if err != nil {
		// Handle error returned from Create
		if fiberErr, ok := err.(*fiber.Error); ok {
			return utils.JSONResponse(ctx, fiberErr.Code, fiberErr.Message, nil, nil)
		}
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Internal server error", nil, err.Error())
	}

	return utils.JSONResponse(ctx, fiber.StatusCreated, "User registered successfully", response, nil)
}

func (c *UserController) Login(ctx *fiber.Ctx) error {
	request := new(model.LoginUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	if err := c.UseCase.ValidateRequest(ctx, request); err != nil {
		if fiberErr, ok := err.(*fiber.Error); ok {
			var validationErrors []map[string]string
			if parseErr := json.Unmarshal([]byte(fiberErr.Message), &validationErrors); parseErr == nil {
				return utils.JSONResponse(ctx, fiberErr.Code, "Validation error", nil, validationErrors)
			}
			return utils.JSONResponse(ctx, fiberErr.Code, fiberErr.Message, nil, nil)
		}
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Internal server error", nil, err.Error())
	}

	response, err := c.UseCase.Login(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to login user: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusUnauthorized, "Invalid email or password", nil, nil)
	}

	// Use global config
	token, err := utils.GenerateJWT(
		&model.JWTClaims{
			UserID:    response.ID,
			Email:     response.Email,
			Active:    response.Active,
			CreatedAt: time.Unix(response.CreatedAt, 0),
			UpdatedAt: time.Unix(response.UpdatedAt, 0),
		},
		viper.GetString("JWT_SECRET"),
	)
	if err != nil {
		c.Log.Warnf("Failed to generate JWT: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Failed to generate JWT", nil, err.Error())
	}

	result := map[string]interface{}{
		"token": token,
		"user":  response,
	}

	return utils.JSONResponse(ctx, fiber.StatusOK, "Login successful", result, nil)
}

func (c *UserController) LoginWithWeb3(ctx *fiber.Ctx) error {
	request := new(model.Web3LoginRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	if err := c.UseCase.ValidateRequest(ctx, request); err != nil {
		if fiberErr, ok := err.(*fiber.Error); ok {
			var validationErrors []map[string]string
			if parseErr := json.Unmarshal([]byte(fiberErr.Message), &validationErrors); parseErr == nil {
				return utils.JSONResponse(ctx, fiberErr.Code, "Validation error", nil, validationErrors)
			}
			return utils.JSONResponse(ctx, fiberErr.Code, fiberErr.Message, nil, nil)
		}
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Internal server error", nil, err.Error())
	}

	user, err := c.UseCase.Web3Login(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to web3 login: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusUnauthorized, "Invalid signature", nil, nil)
	}

	token, err := utils.GenerateJWT(
		&model.JWTClaims{
			UserID:    user.ID,
			Email:     user.Email,
			Active:    user.Active,
			CreatedAt: time.Unix(user.CreatedAt, 0),
			UpdatedAt: time.Unix(user.UpdatedAt, 0),
		},
		viper.GetString("JWT_SECRET"),
	)
	if err != nil {
		c.Log.Warnf("Failed to generate JWT: %+v", err)
		return utils.JSONResponse(ctx, fiber.StatusInternalServerError, "Failed to generate JWT", nil, err.Error())
	}

	result := map[string]interface{}{
		"token": token,
		"user":  user,
	}

	return utils.JSONResponse(ctx, fiber.StatusOK, "Login successful", result, nil)
}
