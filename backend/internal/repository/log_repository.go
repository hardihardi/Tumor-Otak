package repository

import (
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/jmoiron/sqlx"
)

type LogRepository struct {
	db *sqlx.DB
}

func NewLogRepository(db *sqlx.DB) *LogRepository {
	return &LogRepository{db: db}
}

func (r *LogRepository) GetAll() ([]model.ActivityLog, error) {
	logs := []model.ActivityLog{}
	err := r.db.Select(&logs, "SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 50")
	return logs, err
}

func (r *LogRepository) Create(log *model.ActivityLog) error {
	query := `INSERT INTO activity_logs (user_id, action, module) VALUES (:user_id, :action, :module)`
	_, err := r.db.NamedExec(query, log)
	return err
}
