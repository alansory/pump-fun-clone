package utils

import (
	"backend/internal/model"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateJWT(claims *model.JWTClaims, secret string) (string, error) {
	mapClaims := jwt.MapClaims{
		"user_id":    claims.UserID,
		"email":      claims.Email,
		"active":     claims.Active,
		"created_at": claims.CreatedAt,
		"updated_at": claims.UpdatedAt,
		"exp":        time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, mapClaims)
	return token.SignedString([]byte(secret))
}
