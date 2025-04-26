package router

import (
	"capstone.cs.utah.edu/watchout/middleware/apikey"
	"capstone.cs.utah.edu/watchout/middleware/cors"
	"capstone.cs.utah.edu/watchout/routes"
	"github.com/gin-gonic/gin"
)

// Adding the handlers for the routes
func SetupRoutes(r *gin.Engine) {
	//setup health
	r.Use(cors.CORSMiddleware())
	r.Use(apikey.Api_auth())
	healthGroup := r.Group("/health")
	routes.SetupHealthRoutes(healthGroup)

	tvGroup := r.Group("/tv")
	routes.SetupTvRoutes(tvGroup)

	eventGroup := r.Group("/event")
	routes.SetupEventRoutes(eventGroup)

	userGroup := r.Group("/user")
	routes.SetupUserRoutes(userGroup)

}
