package model

type UserResponse struct {
	ID        int64  `json:"id,omitempty"`
	Name      string `json:"name,omitempty"`
	Email     string `json:"email,omitempty"`
	Active    bool   `json:"active,omitempty"`
	CreatedAt int64  `json:"created_at,omitempty"`
	UpdatedAt int64  `json:"updated,omitempty"`
}

type VerifyUserRequest struct {
	Token string `validate:"required"`
}

type RegisterUserRequest struct {
	Name     string  `json:"name" validate:"required,max=100"`
	Email    string  `json:"email" validate:"required,email,min=5"`
	Password string  `json:"password" validate:"required,min=8"`
	Address  *string `json:"address"`
}

type LoginUserRequest struct {
	Email    string `json:"email" validate:"required,min=5"`
	Password string `json:"password" validate:"required,max=100"`
}

type Web3LoginRequest struct {
	Signature string `json:"signature" validate:"required"`
	Address   string `json:"address" validate:"required"`
	Message   string `json:"message" validate:"required"`
	Chain     string `json:"chain" validate:"required"`
}

type GetUserRequest struct {
	ID string `json:"id" validate:"required,max=100"`
}
