package tvmanager

import (
	"context"
	"fmt"
	"time"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/utils/timeutils"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5/pgtype"
)

type FindTeamPrefixModRow struct {
	watchoutdb.FindTeamPrefixRow
	ParsedTime string
}

func GetTeams(name string, userid string, utc string) ([]FindTeamPrefixModRow, error) {

	postgres_store := db.NewPostgresStorage()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)
	teams, err := store.FindTeamPrefix(name, userid)
	var mod_teams []FindTeamPrefixModRow

	for _, t := range teams {
		mod_teams = append(mod_teams, FindTeamPrefixModRow{FindTeamPrefixRow: t, ParsedTime: timeutils.ConvTime(t.Time, utc)})
	}
	return mod_teams, err

}

func GetOwners(name string, userid string) ([]watchoutdb.FindOwnerPrefixRow, error) {

	postgres_store := db.NewPostgresStorage()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	return store.FindOwnerPrefix(name, userid)

}

func GetOwnerById(owner string) (watchoutdb.Owner, error) {

	postgres_store := db.NewPostgresStorage()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	return store.FindOwnerById(owner)

}

type FindEventPrefixModifiedRow struct {
	watchoutdb.FindEventPrefixRow
	ParsedTime string
}

func GetEvents(name string, userid string, utc string) ([]FindEventPrefixModifiedRow, error) {

	postgres_store := db.NewPostgresStorage()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	events, err := store.FindEventPrefix(name, userid)

	var mod_events []FindEventPrefixModifiedRow
	for _, e := range events {
		mod_events = append(mod_events, FindEventPrefixModifiedRow{FindEventPrefixRow: e, ParsedTime: timeutils.ConvTime(e.Time, utc)})
	}

	return mod_events, err

}

type FindGamePrefixRowModified struct {
	Team1      pgtype.Text
	Team2      pgtype.Text
	Type       string
	Time       string
	ParsedTime string
	Title      string
	Gid        int32
	IsFav      bool
}

func GetGames(title string, user string, utc string) ([]FindGamePrefixRowModified, error) {

	postgres_store := db.NewPostgresStorage()
	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)
	games, err := store.FindGamePrefix(title, user)
	if err != nil {
		fmt.Println(err)
	}

	var out_games []FindGamePrefixRowModified
	for _, g := range games {
		out_games = append(out_games, FindGamePrefixRowModified{Team1: g.Team1, Team2: g.Team2, Type: g.Type, ParsedTime: timeutils.ConvTime(g.Time, utc), Time: g.Time.Time.String(), Title: g.Title, Gid: g.Gid, IsFav: g.IsFav})
	}
	return out_games, nil

}

func GetChannelsByString(name string) ([]watchoutdb.Channel, error) {

	postgres_store := db.NewPostgresStorage()
	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	return store.FindChannelByString(name)

}

func GetScheduleByChannel(channel int, t string) (watchoutdb.GetScheduleByChannelRow, error) {

	postgres_store := db.NewPostgresStorage()
	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	layout := "2006-01-02 15:04:05"
	parsed_time, err_time := time.Parse(layout, t)
	if err_time != nil {
		return watchoutdb.GetScheduleByChannelRow{}, err_time
	}

	res, err := store.FindScheduleByChannel(channel, parsed_time)
	fmt.Println(parsed_time)
	if len(res) < 1 {
		return watchoutdb.GetScheduleByChannelRow{}, nil
	}
	return res[0], err
}
