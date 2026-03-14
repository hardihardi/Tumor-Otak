package repository

import (
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/jmoiron/sqlx"
)

type MRIRepository struct {
	db *sqlx.DB
}

func NewMRIRepository(db *sqlx.DB) *MRIRepository {
	return &MRIRepository{db: db}
}

func (r *MRIRepository) SaveScan(scan *model.MRIScan) error {
	query := `INSERT INTO mri_scans (id, patient_id, image_url, analysis_status, prediction, confidence)
	          VALUES (:id, :patient_id, :image_url, :analysis_status, :prediction, :confidence)`
	_, err := r.db.NamedExec(query, scan)
	return err
}

func (r *MRIRepository) GetRecentScans() ([]model.MRIScan, error) {
	scans := []model.MRIScan{}
	err := r.db.Select(&scans, "SELECT * FROM mri_scans ORDER BY created_at DESC LIMIT 10")
	return scans, err
}
