package handlers

import (
	"strconv"
	"time"

	"capstone.cs.utah.edu/watchout/managers/eventmanager"
	"github.com/gin-gonic/gin"
)

func CreateEvent(c *gin.Context) {

	event_title := c.PostForm("eventTitle")
	event_description := c.PostForm("eventDescription")
	event_time := c.PostForm("eventTime")
	game_id := c.PostForm("gameid")
	owner_id := c.PostForm("ownerid")

	parsed_game_id, parse_err := strconv.Atoi(game_id)

	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid gameid",
			"error": parse_err,
		})

		return
	}

	layout := "2006-01-02 15:04:05"
	parsed_time, time_err := time.Parse(layout, event_time)

	if time_err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed parsing time",
			"error": time_err,
		})
	} else {

		event, create_err := eventmanager.CreateEvent(event_title, event_description, parsed_time, int32(parsed_game_id), owner_id)

		if create_err != nil {
			c.JSON(500, gin.H{
				"msg":   "server failed creating event",
				"error": create_err,
			})
		} else {

			c.JSON(200, gin.H{
				"data": event,
			})
		}
	}

}

func DeleteEventById(c *gin.Context) {
	eid := c.Query("eid")

	eid_parsed, parse_err := strconv.Atoi(eid)

	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid eid",
			"error": parse_err,
		})

		return
	}

	err := eventmanager.DeleteEventById(int32(eid_parsed))

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "Failed to delete event",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"success": true,
		})
	}

}

func GetEventsByOwner(c *gin.Context) {
	event_owner := c.Query("ownerid")
	utc := c.Query("utc")

	events, err := eventmanager.GetEventsByOwner(event_owner, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving events for owner",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"events": events,
		})
	}

}

func GetEventsByGameTitle(c *gin.Context) {
	game_title := c.Query("gameTitle")
	events, err := eventmanager.GetEventsByGameTitle(game_title)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving events for game title",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"events": events,
		})
	}

}

func GetEventsByGameId(c *gin.Context) {
	gid := c.Query("gameId")
	uid := c.Query("uid")
	utc := c.Query("utc")

	gid_parsed, parse_err := strconv.Atoi(gid)
	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid gid",
			"error": parse_err,
		})

		return
	}

	events, err := eventmanager.GetEventsByGameId(gid_parsed, utc, uid)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving events for game id",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"events": events,
		})
	}

}

func GetEventsByTitle(c *gin.Context) {
	Title := c.Query("title")
	utc := c.Query("utc")

	events, err := eventmanager.GetEventsByTitle(Title, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving events for title",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"events": events,
		})
	}
}

func GetEventLikeCount(c *gin.Context) {
	eid := c.Query("eid")

	eid_parsed, parse_err := strconv.Atoi(eid)

	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid eid",
			"error": parse_err,
		})

		return
	}
	count, err := eventmanager.GetEventLikeCount(eid_parsed)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving likes for events",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"count": count,
		})
	}
}

func StartTransmission(c *gin.Context) {
	transmission_description := c.PostForm("transmissionDescription")
	transmission_channel := c.PostForm("channelid")
	transmission_owner := c.PostForm("ownerid")

	cid_parsed, parse_err := strconv.Atoi(transmission_channel)
	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid cid",
			"error": parse_err,
		})

		return
	}

	transmission, create_err := eventmanager.StartTransmission(transmission_description, int32(cid_parsed), transmission_owner)

	if create_err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed creating transmission",
			"error": create_err,
		})
	} else {

		c.JSON(200, gin.H{
			"data": transmission,
		})
	}
}

func StopTransmission(c *gin.Context) {
	tid := c.Query("tID")

	tid_parsed, parse_err := strconv.Atoi(tid)
	if parse_err != nil {

		c.JSON(500, gin.H{
			"msg":   "invalid tid",
			"error": parse_err,
		})

		return
	}
	err := eventmanager.StopTransmission(int32(tid_parsed))

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed stopping transmission",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"success": true,
		})
	}
}

func GetTransmissionsByOwner(c *gin.Context) {
	owner := c.Query("ownerID")

	transmissions, err := eventmanager.GetTransmissionsByOwner(owner)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving transmission for owner",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"transmissions": transmissions,
		})
	}
}
