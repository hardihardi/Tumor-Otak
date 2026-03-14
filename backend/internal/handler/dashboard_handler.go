package handler

import (
	"net/http"
	"github.com/bumame/brain-tumor-detection/internal/repository"
	"github.com/gin-gonic/gin"
)

type DashboardHandler struct {
	patientRepo *repository.PatientRepository
	mriRepo     *repository.MRIRepository
}

func NewDashboardHandler(p *repository.PatientRepository, m *repository.MRIRepository) *DashboardHandler {
	return &DashboardHandler{patientRepo: p, mriRepo: m}
}

func (h *DashboardHandler) GetStats(c *gin.Context) {
	patients, _ := h.patientRepo.GetAll()
	scans, _ := h.mriRepo.GetRecentScans()

	tumorCount := 0
	for _, s := range scans {
		if s.Prediction != "No Tumor" {
			tumorCount++
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"total_patients": len(patients),
		"total_scans":    len(scans),
		"tumor_detected": tumorCount,
		"recent_scans":   scans,
	})
}
