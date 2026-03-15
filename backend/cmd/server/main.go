package main

import (
	"github.com/bumame/brain-tumor-detection/internal/handler"
	"github.com/bumame/brain-tumor-detection/internal/repository"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	db := repository.NewDB()
	patientRepo := repository.NewPatientRepository(db)
	mriRepo := repository.NewMRIRepository(db)
	logRepo := repository.NewLogRepository(db)

	mriHandler := handler.NewMRIHandler(mriRepo, logRepo)
	patientHandler := handler.NewPatientHandler(patientRepo, logRepo)
	dashboardHandler := handler.NewDashboardHandler(patientRepo, mriRepo)
	logHandler := handler.NewLogHandler(logRepo)

	v1 := r.Group("/api/v1")
	{
		v1.GET("/stats", dashboardHandler.GetStats)
		v1.GET("/logs", logHandler.GetLogs)
		mri := v1.Group("/mri")
		{
			mri.POST("/upload", mriHandler.UploadMRI)
			mri.POST("/analyze", mriHandler.AnalyzeMRI)
			mri.GET("/recent", mriHandler.GetRecentScans)
		}
		patients := v1.Group("/patients")
		{
			patients.GET("/", patientHandler.GetPatients)
			patients.POST("/", patientHandler.CreatePatient)
		}
	}
	r.Run(":8080")
}
