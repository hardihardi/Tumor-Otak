package model
import "time"
type MRIScan struct {
	ID             string    `json:"id"`
	PatientID      string    `json:"patient_id"`
	ImageURL       string    `json:"image_url"`
	AnalysisStatus string    `json:"analysis_status"`
	Prediction     string    `json:"prediction"`
	Confidence     float64   `json:"confidence"`
	CreatedAt      time.Time `json:"created_at"`
}
type MRIUploadRequest struct {
	PatientID string `json:"patient_id" binding:"required"`
	ImageURL  string `json:"image_url" binding:"required"`
}
