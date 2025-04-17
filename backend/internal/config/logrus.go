package config

import (
	"strconv"

	"github.com/sirupsen/logrus"
)

func NewLogger(config *Config) *logrus.Logger {
	log := logrus.New()

	intLevel, err := strconv.Atoi(config.LogLevel)
	if err != nil {
		log.Fatalf("invalid log level: %s", config.LogLevel)
	}

	if intLevel < 0 || intLevel > 6 {
		log.Fatalf("invalid log level: %d", intLevel)
	}

	// Peta integer ke logrus.Level
	var level logrus.Level
	switch intLevel {
	case 0:
		level = logrus.PanicLevel
	case 1:
		level = logrus.FatalLevel
	case 2:
		level = logrus.ErrorLevel
	case 3:
		level = logrus.WarnLevel
	case 4:
		level = logrus.InfoLevel
	case 5:
		level = logrus.DebugLevel
	case 6:
		level = logrus.TraceLevel
	}
	log.SetLevel(level)
	log.SetFormatter(&logrus.JSONFormatter{})

	return log
}
