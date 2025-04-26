package handlers

import (
	"github.com/gin-gonic/gin"
)

func HandleHealthCheck(c *gin.Context) {
	is_auth := c.MustGet("auth").(bool)

	if is_auth {

		c.JSON(200, gin.H{
			"msg": "ok",
		})

	} else {

		c.JSON(401, gin.H{
			"msg": "not authorized",
		})
	}
}

func HandleHealthCheckFail(c *gin.Context) {

	c.JSON(500, gin.H{
		"msg": "Forced server fail",
	})
}
