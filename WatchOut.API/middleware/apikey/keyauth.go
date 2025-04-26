package apikey

import (
	"os"

	"capstone.cs.utah.edu/watchout/utils/envutils"
	"github.com/gin-gonic/gin"
)

func Api_auth() gin.HandlerFunc {

	return func(c *gin.Context) {
		key := c.Request.Header.Get("wo_api_key")

		envutils.LoadEnv()

		if key == os.Getenv("WO_API_KEY") {
			c.Set("auth", true)
		} else {
			c.AbortWithStatus(401)
		}

		c.Next()

	}

}
