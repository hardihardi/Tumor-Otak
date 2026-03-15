package model

import "time"

type ActivityLog struct {
	ID        string    `json:"id" db:"id"`
	UserID    string    `json:"user_id" db:"user_id"`
	Action    string    `json:"action" db:"action"`
	Module    string    `json:"module" db:"module"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}
