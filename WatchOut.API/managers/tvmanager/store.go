package tvmanager

import (
	"context"
	"fmt"
	"time"

	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/sirupsen/logrus"
)

type Store struct {
	db *pgx.Conn
}

func NewStore(db *pgx.Conn) *Store {

	return &Store{db: db}
}

func (s *Store) FindTeamPrefix(name string, userid string) ([]watchoutdb.FindTeamPrefixRow, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	teams, err := queries.FindTeamPrefix(ctx, watchoutdb.FindTeamPrefixParams{Column1: pgtype.Text{String: name, Valid: true}, Userid: userid})
	fmt.Println()
	fmt.Println(name, userid)
	if err != nil {
		fmt.Printf("GOT ERROR: %v", err)
		return []watchoutdb.FindTeamPrefixRow{}, err
	}

	return teams, nil

}

func (s *Store) FindGamePrefix(name string, user string) ([]watchoutdb.FindGamePrefixRow, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	games, err := queries.FindGamePrefix(ctx, watchoutdb.FindGamePrefixParams{Column1: pgtype.Text{String: name, Valid: true}, Userid: user})

	if err != nil {
		fmt.Printf("GOT ERROR: %v", err)
		return []watchoutdb.FindGamePrefixRow{}, err
	}

	return games, nil

}

func (s *Store) FindOwnerPrefix(name string, user string) ([]watchoutdb.FindOwnerPrefixRow, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	owners, err := queries.FindOwnerPrefix(ctx, watchoutdb.FindOwnerPrefixParams{Column1: pgtype.Text{String: name, Valid: true}, Userid: user})

	if err != nil {
		fmt.Printf("GOT ERROR: %v", err)
		return []watchoutdb.FindOwnerPrefixRow{}, err
	}
	return owners, nil
}

func (s *Store) FindOwnerById(owner string) (watchoutdb.Owner, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	owner_res, err := queries.FindOwnerById(ctx, owner)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding owner %v", err)
		return watchoutdb.Owner{}, err

	}

	return owner_res, nil
}

func (s *Store) FindEventPrefix(name string, user string) ([]watchoutdb.FindEventPrefixRow, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	events, err := queries.FindEventPrefix(ctx, watchoutdb.FindEventPrefixParams{Column1: pgtype.Text{String: name, Valid: true}, Userid: user})

	if err != nil {
		fmt.Printf("GOT ERROR: %v", err)
		return []watchoutdb.FindEventPrefixRow{}, err
	}

	return events, nil

}

func (s *Store) CreateTeam(team watchoutdb.Team) (watchoutdb.Team, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_team, err := queries.CreateTeam(ctx, watchoutdb.CreateTeamParams{Name: team.Name, Tid: team.Tid})

	if err != nil {
		return watchoutdb.Team{}, err
	}

	return created_team, nil
}

func (s *Store) CreateChannel(channel watchoutdb.Channel) (watchoutdb.Channel, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_channel, err := queries.CreateChannel(ctx, watchoutdb.CreateChannelParams{Name: channel.Name, Cid: channel.Cid})

	if err != nil {
		return watchoutdb.Channel{}, err
	}
	return created_channel, nil

}

func (s *Store) FindChannelByString(name string) ([]watchoutdb.Channel, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	channels, err := queries.FindChannelByString(ctx, pgtype.Text{String: name, Valid: true})

	if err != nil {
		return []watchoutdb.Channel{}, err
	}
	return channels, nil

}

func (s *Store) FindScheduleByChannel(channel int, time time.Time) ([]watchoutdb.GetScheduleByChannelRow, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	schedules, err := queries.GetScheduleByChannel(ctx, watchoutdb.GetScheduleByChannelParams{Channel: int32(channel), Starttime: pgtype.Timestamp{Time: time, Valid: true}})

	if err != nil {
		return []watchoutdb.GetScheduleByChannelRow{}, err
	}
	return schedules, nil
}

func (s *Store) CreateGame(game watchoutdb.Game) (watchoutdb.Game, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_game, err := queries.CreateGame(ctx, watchoutdb.CreateGameParams{
		Time:  game.Time,
		Type:  game.Type,
		Title: game.Title,
		Team1: game.Team1,
		Team2: game.Team2,
	})

	if err != nil {
		return watchoutdb.Game{}, err
	}

	return created_game, nil
}

func (s *Store) FindTeam(name string) (watchoutdb.Team, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	team, err := queries.FindTeam(ctx, pgtype.Text{String: name, Valid: true})

	if err != nil {
		return watchoutdb.Team{}, err
	}

	return team, nil

}
