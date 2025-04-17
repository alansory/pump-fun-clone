package config

import (
	"github.com/go-playground/validator/v10"
)

func NewValidator(viper *Config) *validator.Validate {
	return validator.New()
}
