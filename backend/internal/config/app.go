package config

import (
	"backend/internal/delivery/http/controller"
	"backend/internal/delivery/http/route"
	"backend/internal/gateway/messaging"
	"backend/internal/repository"
	"backend/internal/usecase"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type BootstrapConfig struct {
	DB       *gorm.DB
	App      *fiber.App
	Log      *logrus.Logger
	Validate *validator.Validate
	Config   *Config
	Producer *kafka.Producer
}

func Bootstrap(config *BootstrapConfig) {
	// setup repositories
	userRepository := repository.NewUserRepository(config.Log)

	// setup producer
	userProducer := messaging.NewUserProducer(config.Producer, config.Log)

	// setup use cases
	userUseCase := usecase.NewUserUseCase(config.DB, config.Log, config.Validate, userRepository, userProducer)

	// setup controller
	userController := controller.NewUserController(userUseCase, config.Log)

	// setup middleware
	// authMiddleware := middleware.NewAuth(userUseCase)

	routeConfig := route.RouteConfig{
		App:            config.App,
		UserController: userController,
		// AuthMiddleware: authMiddleware,
	}

	routeConfig.Setup()
}
