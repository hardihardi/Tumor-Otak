package handler

import (
	"bytes"
	"encoding/json"
	"io"
	"mime/multipart"
	"net/http"
	"time"
	"fmt"
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/bumame/brain-tumor-detection/internal/repository"
	"github.com/gin-gonic/gin"
)

type MRIHandler struct {
	repo *repository.MRIRepository
}

func NewMRIHandler(repo *repository.MRIRepository) *MRIHandler {
	return &MRIHandler{repo: repo}
}

func (h *MRIHandler) UploadMRI(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "MRI uploaded successfully"})
}

func (h *MRIHandler) AnalyzeMRI(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}
	defer file.Close()

	patientID := c.PostForm("patient_id")

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("file", header.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create form file"})
		return
	}
	_, err = io.Copy(part, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to copy file"})
		return
	}
	writer.Close()

	resp, err := http.Post("http://localhost:8000/predict", writer.FormDataContentType(), body)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "ML service unavailable"})
		return
	}
	defer resp.Body.Close()

	var mlResult struct {
		Prediction      int     `json:"prediction"`
		PredictionLabel string  `json:"prediction_label"`
		Confidence      float64 `json:"confidence"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&mlResult); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode ML result"})
		return
	}

	// Save to database
	scan := &model.MRIScan{
		ID:             fmt.Sprintf("SCAN-%d", time.Now().Unix()),
		PatientID:      patientID,
		ImageURL:       header.Filename, // Mock URL
		AnalysisStatus: "Completed",
		Prediction:     mlResult.PredictionLabel,
		Confidence:     mlResult.Confidence,
		CreatedAt:      time.Now(),
	}

	if err := h.repo.SaveScan(scan); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save scan results: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":          "Analysis complete",
		"patient_id":       patientID,
		"prediction":       mlResult.Prediction,
		"prediction_label": mlResult.PredictionLabel,
		"confidence":       mlResult.Confidence,
	})
}

func (h *MRIHandler) GetRecentScans(c *gin.Context) {
	scans, err := h.repo.GetRecentScans()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"scans": scans})
}
