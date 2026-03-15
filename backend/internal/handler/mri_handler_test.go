package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestUploadMRI(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	// Mock handler with nil repos for basic endpoint test
	h := NewMRIHandler(nil, nil)
	r.POST("/upload", h.UploadMRI)

	reqBody, _ := json.Marshal(model.MRIUploadRequest{
		PatientID: "123",
		ImageURL:  "http://example.com/mri.jpg",
	})
	req, _ := http.NewRequest(http.MethodPost, "/upload", bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]string
	json.Unmarshal(w.Body.Bytes(), &response)
	assert.Equal(t, "MRI uploaded successfully", response["message"])
}
