package routes

import (
	"capstone.cs.utah.edu/watchout/handlers"
	"github.com/gin-gonic/gin"
)

func SetupTvRoutes(rg *gin.RouterGroup) {
	rg.GET("/teams", handlers.GetTeam)
	rg.GET("/games", handlers.GetGame)
	rg.GET("/events", handlers.GetEvent)
	rg.GET("/owners", handlers.GetOwnerByName)
	rg.GET("/ownerById", handlers.GetOwnerById)
	rg.GET("/channelsByString", handlers.GetChannelsByString)
	rg.GET("/scheduleByChannel", handlers.GetScheduleByChannel)

}
