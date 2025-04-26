package databatchmanager

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5/pgtype"
)

type TeamPair struct {
	Team1   pgtype.Text `json:"team1"`
	Team2   pgtype.Text `json:"team2"`
	TeamID1 int         `json:"team1ID"`
	TeamID2 int         `json:"team2ID"`
}

type TempGame struct {
	Time        pgtype.Text `json:"listDateTime"`
	Type        pgtype.Text `json:"showType"`
	Title       pgtype.Text `json:"episodeTitle"`
	Team1       pgtype.Text `json:"team1"`
	Team2       pgtype.Text `json:"team2"`
	Description pgtype.Text `json:"description"`
	Duration    int         `json:"duration"`
	ListingID   int         `json:"listingID"`
	Channel     int         `json:"stationID"`
}

type StateListing struct {
	State pgtype.Text `json:"state"`
	Lid   pgtype.Text `json:"lid"`
	UTC   pgtype.Text `json:"utc"`
}

type TempChannel struct {
	Name pgtype.Text `json:"name"`
	Cid  int32       `json:"stationID"`
}

func BatchData() error {

	//need to find a way to change base dir of running program?
	dir, direrr := os.Getwd()
	if direrr != nil {
		fmt.Println("Error getting current directory:", direrr)
		return nil
	}

	states, jsonerr := os.Open(dir + "/managers/databatchmanager/states.json")

	if jsonerr != nil {
		fmt.Println("error open json:", jsonerr)
		return nil
	}

	defer states.Close()

	bytes, json_err := io.ReadAll(states)

	if json_err != nil {
		fmt.Println("error reading json:", json_err)
		return nil
	}
	var stateListing []StateListing
	json.Unmarshal(bytes, &stateListing)

	postgres_conn := db.NewPostgresStorage()
	defer postgres_conn.Conn.Close(context.Background())
	postgres_conn.CleanBeforeBatch()

	for _, s := range stateListing {
		ProcessData(s.State.String, s.Lid.String, postgres_conn)
	}

	return nil

}

func ProcessData(state string, lid string, postgres_conn *db.PostgresStorage) error {

	tv_listing_bytes, tv_err := GetListingByState(state, lid)

	if tv_err != nil {
		return tv_err
	}

	store := NewStore(postgres_conn.Conn)

	var teampairs []TeamPair
	var channels []watchoutdb.Channel
	var tempgames []TempGame
	var tempchannels []TempChannel

	json.Unmarshal(tv_listing_bytes, &channels)
	json.Unmarshal(tv_listing_bytes, &teampairs)
	json.Unmarshal(tv_listing_bytes, &tempgames)
	json.Unmarshal(tv_listing_bytes, &tempchannels)

	//this can return err if team already exists
	for _, t := range teampairs {
		if t.Team1.String != "" {
			createTeam(watchoutdb.Team{Name: pgtype.Text{String: t.Team1.String, Valid: true}, Tid: int32(t.TeamID1)}, store)
		}
		if t.Team2.String != "" {
			createTeam(watchoutdb.Team{Name: pgtype.Text{String: t.Team2.String, Valid: true}, Tid: int32(t.TeamID2)}, store)
		}
	}

	//this can return err if channel already exists
	for _, c := range tempchannels {
		createChannel(watchoutdb.Channel{Name: c.Name, Cid: c.Cid}, store)
	}

	for _, g := range tempgames {

		if g.Team1.String == "" || g.Team2.String == "" {
			continue
		}

		var real_game watchoutdb.Game
		curr_time := g.Time.String

		layout := "2006-01-02 15:04:05"
		parsed_time, err := time.Parse(layout, curr_time)
		if err != nil {
			fmt.Println(err)
			return err
		}
		var timestamp pgtype.Timestamp
		timestamp.Time = parsed_time
		timestamp.Valid = true

		real_game.Time = timestamp

		team1, err1 := getTeam(g.Team1.String, store)
		if err1 != nil {
			return err1
		}

		team2, err2 := getTeam(g.Team2.String, store)
		if err2 != nil {
			return err2
		}

		newGame := watchoutdb.Game{Time: timestamp, Type: g.Type.String, Title: g.Title.String, Team1: team1.Tid, Team2: team2.Tid, Gid: int32(g.ListingID)}
		createGame(newGame, store)
		endtime := timestamp.Time.UTC().Add(time.Duration(g.Duration) * time.Minute)

		createSchedule(watchoutdb.Schedule{Game: newGame.Gid, Channel: int32(g.Channel), Starttime: timestamp, Endtime: pgtype.Timestamp{Time: endtime, Valid: true}}, store)

	}

	return nil
}

func createTeam(team watchoutdb.Team, store *Store) error {
	_, err := store.CreateTeam(team)

	if err != nil {
		return err
	}

	return nil
}

func createChannel(channel watchoutdb.Channel, store *Store) error {
	_, err := store.CreateChannel(channel)
	if err != nil {
		return err
	}
	return nil
}

func createSchedule(schedule watchoutdb.Schedule, store *Store) error {
	_, err := store.CreateSchedule(schedule)
	if err != nil {
		return err
	}
	return nil
}

func createGame(game watchoutdb.Game, store *Store) error {
	_, err := store.CreateGame(game)
	if err != nil {
		return err
	}
	return nil
}

func getTeam(name string, store *Store) (watchoutdb.Team, error) {
	team, err := store.findTeam(name)
	if err != nil {

		return watchoutdb.Team{}, err
	}

	return team, nil

}
