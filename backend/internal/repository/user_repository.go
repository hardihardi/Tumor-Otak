package repository

import (
	"context"
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/jmoiron/sqlx"
)

type UserRepository struct {
	db *sqlx.DB
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) FindAll(ctx context.Context) ([]model.User, error) {
	var users []model.User
	query := `
		SELECT u.id, u.name, u.email, u.role_id, r.name as role_name, u.created_at
		FROM users u
		LEFT JOIN roles r ON u.role_id = r.id
		ORDER BY u.created_at DESC`
	err := r.db.SelectContext(ctx, &users, query)
	return users, err
}

func (r *UserRepository) Create(ctx context.Context, u *model.User) error {
	query := `
		INSERT INTO users (name, email, password_hash, role_id)
		VALUES (:name, :email, :password_hash, :role_id)
		RETURNING id, created_at`

	rows, err := r.db.NamedQueryContext(ctx, query, u)
	if err != nil {
		return err
	}
	defer rows.Close()

	if rows.Next() {
		return rows.Scan(&u.ID, &u.CreatedAt)
	}
	return nil
}

func (r *UserRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, "DELETE FROM users WHERE id = ", id)
	return err
}

func (r *UserRepository) GetRoles(ctx context.Context) ([]model.Role, error) {
	var roles []model.Role
	err := r.db.SelectContext(ctx, &roles, "SELECT id, name FROM roles ORDER BY id")
	return roles, err
}
