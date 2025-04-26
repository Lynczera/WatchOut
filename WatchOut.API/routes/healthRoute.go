package routes

import (
	"capstone.cs.utah.edu/watchout/handlers"
	"github.com/gin-gonic/gin"
)

func SetupHealthRoutes(rg *gin.RouterGroup) {
	rg.GET("/check", handlers.HandleHealthCheck)
	rg.GET("/fail", handlers.HandleHealthCheckFail)
}
