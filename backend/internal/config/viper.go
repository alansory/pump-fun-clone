package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Environment           string        `mapstructure:"ENVIRONMENT"`
	AppName               string        `mapstructure:"APP_NAME"`
	DBSource              string        `mapstructure:"DB_SOURCE"`
	DBIdleConnection      int           `mapstructure:"DB_IDLE_CONNECTION"`
	DBMaxConnection       int           `mapstructure:"DB_MAX_CONNECTION"`
	DBMaxLifeTime         int           `mapstructure:"DB_MAX_LIFE_TIME_CONNECTION"`
	LogLevel              string        `mapstructure:"LOG_LEVEL"`
	WebPrefork            bool          `mapstructure:"WEB_PREFORK"`
	JWTSecret             string        `mapstructure:"JWT_SECRET"`
	WebPort               string        `mapstructure:"WEB_PORT"`
	KafkaBootstrapServers string        `mapstructure:"KAFKA_BOOTSTRAP_SERVERS"`
	KafkaAutoOffsetReset  string        `mapstructure:"KAFKA_AUTO_OFFSET_RESET"`
	KafkaGroupID          string        `mapstructure:"KAFKA_GROUP_ID"`
	MigrationURL          string        `mapstructure:"MIGRATION_URL"`
	RedisAddress          string        `mapstructure:"REDIS_ADDRESS"`
	HTTPServerAddress     string        `mapstructure:"HTTP_SERVER_ADDRESS"`
	TokenSymmetricKey     string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	AccessTokenDuration   time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration  time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
}

func NewViper(path string) (config *Config) {
	viper.SetConfigName("app")
	viper.SetConfigType("env")
	viper.AddConfigPath(path)

	viper.AutomaticEnv()
	err := viper.ReadInConfig()

	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %w \n", err))
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		panic(fmt.Errorf("Failed unmarshal: %w \n", err))
	}
	return config

}
