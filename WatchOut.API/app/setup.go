package app

import (
	"capstone.cs.utah.edu/watchout/router"
	"github.com/gin-gonic/gin"
)

func Setup() (*gin.Engine, error) {

	r := gin.Default()
	router.SetupRoutes(r)

	return r, nil

}
