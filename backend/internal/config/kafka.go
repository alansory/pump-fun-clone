package config

import (
	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/sirupsen/logrus"
)

func NewKafkaConsumer(config *Config, log *logrus.Logger) *kafka.Consumer {
	kafkaConfig := &kafka.ConfigMap{
		"bootstrap.servers": config.KafkaBootstrapServers,
		"group.id":          config.KafkaGroupID,
		"auto.offset.reset": config.KafkaAutoOffsetReset,
	}

	consumer, err := kafka.NewConsumer(kafkaConfig)
	if err != nil {
		log.Fatalf("Failed to create consumer: %v", err)
	}
	return consumer
}

func NewKafkaProducer(config *Config, log *logrus.Logger) *kafka.Producer {
	kafkaConfig := &kafka.ConfigMap{
		"bootstrap.servers": config.KafkaBootstrapServers,
	}

	producer, err := kafka.NewProducer(kafkaConfig)
	if err != nil {
		log.Fatalf("Failed to create producer: %v", err)
	}
	return producer
}
