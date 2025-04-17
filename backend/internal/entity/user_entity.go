package entity

import "time"

type User struct {
	ID               int64      `gorm:"cloumn:id;primaryKey;autoIncrement"`
	Name             string     `gorm:"column:name;type:varchar(255);not null"`
	Address          *string    `gorm:"column:address;type:varchar(255);unique"`
	Email            *string    `gorm:"column:email;type:varchar(255);unique"`
	Password         string     `gorm:"column:password"`
	EmailVerifiedAt  *time.Time `gorm:"column:email_verified_at"`
	ProfilePhotoPath *string    `gorm:"column:profile_photo_path;type:varchar(255)"`
	Otp              *string    `gorm:"column:otp;type:varchar(255)"`
	OtpExpiresAt     *time.Time `gorm:"column:otp_expires_at"`
	Active           bool       `gorm:"column:active;default:true"`
	Banned           bool       `gorm:"column:banned;default:false"`
	RememberToken    *string    `gorm:"column:remember_token;type:varchar(100)"`
	CreatedAt        time.Time  `gorm:"column:created_at;default:current_timestamp"`
	UpdatedAt        time.Time  `gorm:"column:updated_at;default:current_timestamp"`
}

func (u *User) TableName() string {
	return "users"
}
