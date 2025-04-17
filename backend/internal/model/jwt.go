package model

import "time"

type JWTClaims struct {
	UserID    int64     `json:"user_id"`
	Email     *string   `json:"email"`
	Active    bool      `json:"active"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
