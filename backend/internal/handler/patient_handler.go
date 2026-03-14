package handler

import (
	"net/http"
	"log"
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/bumame/brain-tumor-detection/internal/repository"
	"github.com/gin-gonic/gin"
)

type PatientHandler struct {
	repo *repository.PatientRepository
}

func NewPatientHandler(repo *repository.PatientRepository) *PatientHandler {
	return &PatientHandler{repo: repo}
}

func (h *PatientHandler) GetPatients(c *gin.Context) {
	patients, err := h.repo.GetAll()
	if err != nil {
		log.Printf("Error getting patients: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"patients": patients})
}

func (h *PatientHandler) CreatePatient(c *gin.Context) {
	var patient model.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.Create(&patient); err != nil {
		log.Printf("Error creating patient: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, patient)
}
