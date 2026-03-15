package handler

import (
	"net/http"
	"github.com/bumame/brain-tumor-detection/internal/repository"
	"github.com/gin-gonic/gin"
)

type LogHandler struct {
	repo *repository.LogRepository
}

func NewLogHandler(repo *repository.LogRepository) *LogHandler {
	return &LogHandler{repo: repo}
}

func (h *LogHandler) GetLogs(c *gin.Context) {
	logs, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"logs": logs})
}
