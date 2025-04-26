package routes

import (
	"capstone.cs.utah.edu/watchout/handlers"
	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(rg *gin.RouterGroup) {
	rg.GET("/barsByName", handlers.GetBarsByName)
	rg.GET("/favorite", handlers.GetFavorite)
	rg.POST("/favorite", handlers.Favorite)
	rg.DELETE("/unfavorite", handlers.Unfavorite)
	rg.POST("/customer", handlers.CreateCustomer)
	rg.POST("/owner", handlers.CreateOwner)
	rg.GET("/gamelikecount", handlers.GetGameLikeCount)
	rg.GET("/ownerbyid", handlers.GetOwnerById)
	rg.GET("/userbyid", handlers.GetCustomerById)

}
