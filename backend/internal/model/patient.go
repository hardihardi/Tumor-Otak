package model
import "time"
type Patient struct {
	ID          string    `json:"id"`
	NIK         string    `json:"nik"`
	Name        string    `json:"name"`
	DateOfBirth string    `json:"date_of_birth"`
	Gender      string    `json:"gender"`
	CreatedAt   time.Time `json:"created_at"`
}
