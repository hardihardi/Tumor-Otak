package handler
import (
	"net/http"
	"github.com/bumame/brain-tumor-detection/internal/model"
	"github.com/gin-gonic/gin"
)
type MRIHandler struct{}
func NewMRIHandler() *MRIHandler {
	return &MRIHandler{}
}
func (h *MRIHandler) UploadMRI(c *gin.Context) {
	var req model.MRIUploadRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "MRI uploaded successfully", "patient_id": req.PatientID})
}
func (h *MRIHandler) AnalyzeMRI(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "MRI analysis started"})
}
