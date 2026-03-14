package model

import "time"

type Patient struct {
	ID          string    `json:"id" db:"id"`
	NIK         string    `json:"nik" db:"nik"`
	Name        string    `json:"name" db:"name"`
	DateOfBirth string    `json:"date_of_birth" db:"date_of_birth"`
	Gender      string    `json:"gender" db:"gender"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
