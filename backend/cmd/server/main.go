package main
import (
	"github.com/bumame/brain-tumor-detection/internal/handler"
	"github.com/gin-gonic/gin"
)
func main() {
	r := gin.Default()
	mriHandler := handler.NewMRIHandler()
	v1 := r.Group("/api/v1")
	{
		mri := v1.Group("/mri")
		{
			mri.POST("/upload", mriHandler.UploadMRI)
			mri.POST("/analyze", mriHandler.AnalyzeMRI)
		}
		patients := v1.Group("/patients")
		{
			patients.GET("/", func(c *gin.Context) {
				c.JSON(200, gin.H{"patients": []string{}})
			})
		}
	}
	r.Run(":8080")
}
