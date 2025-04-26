package routes

import (
	"capstone.cs.utah.edu/watchout/handlers"
	"github.com/gin-gonic/gin"
)

func SetupEventRoutes(rg *gin.RouterGroup) {
	rg.GET("/eventsByOwner", handlers.GetEventsByOwner)
	rg.GET("/eventsByGameId", handlers.GetEventsByGameId)
	rg.GET("/eventsByTitle", handlers.GetEventsByTitle)
	rg.GET("/eventLikeCount", handlers.GetEventLikeCount)
	rg.GET("/transmissionsByOwner", handlers.GetTransmissionsByOwner)
	rg.POST("/event", handlers.CreateEvent)
	rg.POST("/startTransmission", handlers.StartTransmission)
	rg.DELETE("/deleteEventById", handlers.DeleteEventById)
	rg.DELETE("stopTransmission", handlers.StopTransmission)
}
