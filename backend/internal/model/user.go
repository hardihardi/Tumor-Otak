package model

import "time"

type User struct {
	ID           int       `db:"id" json:"id"`
	Name         string    `db:"name" json:"name"`
	Email        string    `db:"email" json:"email"`
	PasswordHash string    `db:"password_hash" json:"-"`
	RoleID       int       `db:"role_id" json:"role_id"`
	RoleName     string    `db:"role_name" json:"role_name,omitempty"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
}

type Role struct {
	ID   int    `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

type CreateUserRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
	RoleID   int    `json:"role_id" binding:"required"`
}
