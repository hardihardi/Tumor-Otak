package repository

import (
	"context"
	"database/sql"
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
	err := r.db.Select(&logs, "SELECT id, user_id, action, module, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 100")
	return logs, err
}

func (r *LogRepository) Create(log *model.ActivityLog) error {
	query := `INSERT INTO activity_logs (user_id, action, module) VALUES (:user_id, :action, :module)`
	_, err := r.db.NamedExec(query, log)
	return err
}

func (r *LogRepository) Log(ctx context.Context, userID, action, module, ip, resourceID string) error {
	var uID sql.NullString
	if userID != "" && userID != "0" {
		uID = sql.NullString{String: userID, Valid: true}
	} else {
		uID = sql.NullString{Valid: false}
	}

	query := `INSERT INTO activity_logs (user_id, action, module) VALUES ($1, $2, $3)`
	_, err := r.db.ExecContext(ctx, query, uID, action, module)
	return err
}
