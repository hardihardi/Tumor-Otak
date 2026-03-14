package repository

import (
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/jmoiron/sqlx"
)

type PatientRepository struct {
	db *sqlx.DB
}

func NewPatientRepository(db *sqlx.DB) *PatientRepository {
	return &PatientRepository{db: db}
}

func (r *PatientRepository) GetAll() ([]model.Patient, error) {
	patients := []model.Patient{}
	err := r.db.Select(&patients, "SELECT * FROM patients ORDER BY created_at DESC")
	return patients, err
}

func (r *PatientRepository) Create(p *model.Patient) error {
	query := `INSERT INTO patients (nik, name, gender, date_of_birth)
	          VALUES (:nik, :name, :gender, :date_of_birth)`
	_, err := r.db.NamedExec(query, p)
	return err
}
