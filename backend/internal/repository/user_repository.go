package repository

import (
	"backend/internal/entity"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type UserRepository struct {
	Repository[entity.User]
	Log *logrus.Logger
}

func NewUserRepository(log *logrus.Logger) *UserRepository {
	return &UserRepository{
		Log: log,
	}
}

func (r *UserRepository) FindByEmail(db *gorm.DB, user *entity.User, email string) error {
	return db.Where("email = ?", email).First(user).Error
}

func (r *UserRepository) FindOrCreateUserByAddress(db *gorm.DB, user *entity.User, address string) error {
	err := db.Where("address = ?", address).First(user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			user = &entity.User{
				Address: &address,
				Email:   nil,
			}
			if createErr := db.Create(user).Error; createErr != nil {
				r.Log.Errorf("Failed to create user with address %s: %+v", address, createErr)
				return createErr
			}
			return nil
		}
		r.Log.Errorf("Failed to find user with address %s: %+v", address, err)
		return err
	}
	return nil
}
