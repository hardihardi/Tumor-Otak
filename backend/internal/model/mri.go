package model

import "time"

type MRIScan struct {
	ID             string    `json:"id" db:"id"`
	PatientID      string    `json:"patient_id" db:"patient_id"`
	ImageURL       string    `json:"image_url" db:"image_url"`
	AnalysisStatus string    `json:"analysis_status" db:"analysis_status"`
	Prediction     string    `json:"prediction" db:"prediction"`
	Confidence     float64   `json:"confidence" db:"confidence"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
}

type MRIUploadRequest struct {
	PatientID string `json:"patient_id" binding:"required"`
	ImageURL  string `json:"image_url" binding:"required"`
}
