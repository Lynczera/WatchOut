package handlers

import (
	"fmt"
	"strconv"

	"capstone.cs.utah.edu/watchout/managers/usermanager"
	"capstone.cs.utah.edu/watchout/utils/serputils"
	"github.com/gin-gonic/gin"
)

func CreateCustomer(c *gin.Context) {
	name := c.PostForm("name")
	zip := c.PostForm("zip")
	authId := c.PostForm("authid")
	fmt.Println(fmt.Sprintf("name is %s", name))

	customer, err := usermanager.CreateCustomer(name, zip, authId)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed creating customer",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"data": customer,
		})
	}
}
func CreateOwner(c *gin.Context) {
	authId := c.PostForm("authid")
	name := c.PostForm("name")
	zip := c.PostForm("zip")
	address := c.PostForm("address")
	city := c.PostForm("city")
	state := c.PostForm("state")
	country := c.PostForm("country")
	hours := ""

	lat, long, coords_err := serputils.GetBarCoords(name, city, state, country)
	if coords_err != nil {

		c.JSON(500, gin.H{
			"msg":   "Server failed creating owner. Something is wrong with the info provided",
			"error": coords_err,
		})
		return
	}

	owner, err := usermanager.CreateOwner(name, zip, address, city, state, country, lat, long, hours, authId)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed creating owner",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"data": owner,
		})
	}
}
func GetGameLikeCount(c *gin.Context) {
	title := c.Query("title")
	utc := c.Query("utc")

	games, err := usermanager.GetGameLikeCount(title, utc)

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving games",
			"error": err,
		})

	} else {
		c.JSON(200, gin.H{
			"games": games,
		})
	}

}

func GetBarsByName(c *gin.Context) {
	name := c.Query("name")
	owners, err := usermanager.GetOwnerByName(name)
	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving owner",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"owners": owners,
		})
	}

}

func GetCustomerById(c *gin.Context) {
	uid := c.Query("uid")
	user, err := usermanager.GetUserById(uid)
	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving Customer",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"Customer": user,
		})
	}

}

// / FAVORITE GAMES ///
func GetFavorite(c *gin.Context) {
	user := c.Query("userID")
	entity_type := c.Query("type")
	utc := c.Query("utc")

	var err error

	var fav any

	if entity_type == "games" {
		favorites, curr_err := usermanager.GetFavoriteGames(user, utc)
		err = curr_err
		fav = favorites
	} else if entity_type == "teams" {
		favorites, curr_err := usermanager.GetFavoriteTeams(user)
		err = curr_err
		fav = favorites
	} else if entity_type == "owners" {
		favorites, curr_err := usermanager.GetFavoriteOwners(user)
		err = curr_err
		fav = favorites
	} else if entity_type == "events" {
		favorites, curr_err := usermanager.GetFavoriteEvents(user, utc)
		err = curr_err
		fav = favorites
	} else {
		c.JSON(500, gin.H{
			"msg": "invalid fav type, neither games, teams, owners or events",
		})
		return
	}

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed retrieving favorites for user",
			"error": err,
		})
	} else {
		c.JSON(200, gin.H{
			"favorites": fav,
		})
	}
}

func Unfavorite(c *gin.Context) {
	id := c.Query("id")
	user := c.Query("userID")
	entity_type := c.Query("type")

	var error error

	if entity_type == "game" {
		id_parsed, parse_err := strconv.Atoi(id)

		if parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid gid",
				"error": parse_err,
			})

			return
		}
		err := usermanager.UnfavoriteGame(user, int32(id_parsed))
		error = err
	} else if entity_type == "owner" {
		err := usermanager.UnfavoriteOwner(user, id)
		error = err
	} else if entity_type == "team" {
		id_parsed, parse_err := strconv.Atoi(id)

		if parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid tid",
				"error": parse_err,
			})

			return
		}
		err := usermanager.UnfavoriteTeam(user, int32(id_parsed))
		error = err
	} else if entity_type == "event" {
		id_parsed, parse_err := strconv.Atoi(id)

		if parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid eid",
				"error": parse_err,
			})

			return
		}
		err := usermanager.UnfavoriteEvent(user, int32(id_parsed))
		error = err
	} else {
		c.JSON(500, gin.H{
			"msg": "Invalid fav type. Neither game, owner, team nor event",
		})

		return
	}

	if error != nil {
		c.JSON(500, gin.H{
			"msg":   "Failed to remove favorite",
			"error": error,
		})

	} else {
		c.JSON(200, gin.H{
			"success": true,
		})
	}

}

func Favorite(c *gin.Context) {
	user := c.PostForm("userID")
	entity_type := c.PostForm("type")
	id := c.PostForm("id")

	var err error
	var fav any

	if entity_type == "game" {
		id_parsed, id_parse_err := strconv.Atoi(id)
		if id_parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid game id",
				"error": id_parse_err,
			})

			return
		}
		favorite, error := usermanager.FavoriteGame(user, id_parsed)
		fav = favorite
		err = error
	} else if entity_type == "owner" {
		favorite, error := usermanager.FavoriteOwners(user, id)
		fav = favorite
		err = error
	} else if entity_type == "team" {
		id_parsed, id_parse_err := strconv.Atoi(id)
		if id_parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid team id",
				"error": id_parse_err,
			})

			return
		}
		favorite, error := usermanager.FavoriteTeams(user, id_parsed)
		fav = favorite
		err = error
	} else if entity_type == "event" {
		id_parsed, id_parse_err := strconv.Atoi(id)
		if id_parse_err != nil {

			c.JSON(500, gin.H{
				"msg":   "invalid event id",
				"error": id_parse_err,
			})

			return
		}
		favorite, error := usermanager.FavoriteEvents(user, id_parsed)
		fav = favorite
		err = error
	} else {
		c.JSON(500, gin.H{
			"msg": "invalid fav type. neither game, owner, team nor event",
		})

		return
	}

	if err != nil {
		c.JSON(500, gin.H{
			"msg":   "server failed creating favorite",
			"error": err,
		})
	} else {

		c.JSON(200, gin.H{
			"data": fav,
		})
	}

}
