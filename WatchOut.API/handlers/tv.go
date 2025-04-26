package handlers

import (
	"strconv"

	"capstone.cs.utah.edu/watchout/managers/tvmanager"
	"github.com/gin-gonic/gin"
)

func GetTeam(c *gin.Context) {
	name := c.Query("name")
	user := c.Query("uid")
	utc := c.Query("utc")

	teams, err := tvmanager.GetTeams(name, user, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving team",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"teams": teams,
		})
	}

}

func GetGame(c *gin.Context) {
	title := c.Query("title")
	user := c.Query("uid")
	utc := c.Query("utc")

	games, err := tvmanager.GetGames(title, user, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving game",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"games": games,
		})
	}

}

func GetOwnerByName(c *gin.Context) {
	name := c.Query("name")
	user := c.Query("uid")

	owners, err := tvmanager.GetOwners(name, user)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving owners",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"owners": owners,
		})
	}
}

func GetOwnerById(c *gin.Context) {
	oid := c.Query("oid")

	owner, err := tvmanager.GetOwnerById(oid)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving owner",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"owner": owner,
		})
	}
}
func GetEvent(c *gin.Context) {

	name := c.Query("title")
	user := c.Query("uid")
	utc := c.Query("utc")

	events, err := tvmanager.GetEvents(name, user, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving events",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"events": events,
		})
	}
}

func GetChannelsByString(c *gin.Context) {
	name := c.Query("name")
	channels, err := tvmanager.GetChannelsByString(name)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving channels",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"channels": channels,
		})
	}

}

func GetScheduleByChannel(c *gin.Context) {

	channel := c.Query("channel")
	time := c.Query("time")

	parsed_channel, ok := strconv.Atoi(channel)
	if ok != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid channel id",
			"error": ok,
		})
		return

	}

	schedule, err := tvmanager.GetScheduleByChannel(parsed_channel, time)
	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "error getting schedule",
			"error": err,
		})
		return
	} else {
		c.JSON(200, gin.H{
			"schedule": schedule,
		})
		return
	}
}
