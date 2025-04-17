package messaging

import (
	"backend/internal/model"
	"encoding/json"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/sirupsen/logrus"
)

type UserConsumer struct {
	Log *logrus.Logger
}

func NewUserConsumer(log *logrus.Logger) *UserConsumer {
	return &UserConsumer{
		Log: log,
	}
}

func (c UserConsumer) Consume(message *kafka.Message) error {
	UserEvent := new(model.UserEvent)
	if err := json.Unmarshal(message.Value, UserEvent); err != nil {
		c.Log.WithError(err).Error("error unmarshal user event")
		return err
	}

	c.Log.Infof("Received topic users with event: %v from partition %d", UserEvent, message.TopicPartition.Partition)
	return nil
}
