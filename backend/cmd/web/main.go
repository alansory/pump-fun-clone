package main

import (
	"backend/internal/config"
)

func main() {
	viperConfig := config.NewViper(".")
	log := config.NewLogger(viperConfig)
	db := config.NewDatabase(viperConfig, log)
	validate := config.NewValidator(viperConfig)
	app := config.NewFiber(viperConfig)
	producer := config.NewKafkaProducer(viperConfig, log)

	config.Bootstrap(&config.BootstrapConfig{
		DB:       db,
		App:      app,
		Log:      log,
		Validate: validate,
		Config:   viperConfig,
		Producer: producer,
	})

	webPort := viperConfig.WebPort
	err := app.Listen(":" + webPort)
	if err != nil {
		log.Fatalf("Failed to start web server: %v", err)
	}
}
