package model

import "strconv"

type UserEvent struct {
	ID        int64   `json:"id,omitempty"`
	Name      string  `json:"name,omitempty"`
	Email     *string `json:"email,omitempty"`
	Active    bool    `json:"active,omitempty"`
	CreatedAt int64   `json:"created_at,omitempty"`
	UpdatedAt int64   `json:"updated,omitempty"`
}

func (u *UserEvent) GetId() string {
	return strconv.FormatInt(u.ID, 10)
}
