package repository

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
)

func NewDB() *sqlx.DB {
	// Using a hardcoded connection string for stability in this environment
	dsn := "postgresql://neondb_owner:npg_poGJ6HxB9mPt@ep-aged-truth-amq035an-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"

	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	return db
}
