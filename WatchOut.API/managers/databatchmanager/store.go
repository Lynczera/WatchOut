package databatchmanager

import (
	"context"

	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type Store struct {
	db *pgx.Conn
}

func NewStore(db *pgx.Conn) *Store {

	return &Store{db: db}
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

func (s *Store) CreateSchedule(schedule watchoutdb.Schedule) (watchoutdb.Schedule, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_channel, err := queries.CreateSchedule(ctx, watchoutdb.CreateScheduleParams{Game: schedule.Game, Channel: schedule.Channel, Starttime: schedule.Starttime, Endtime: schedule.Endtime})

	if err != nil {
		return watchoutdb.Schedule{}, err
	}
	return created_channel, nil

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
		Gid:   game.Gid,
	})

	if err != nil {
		return watchoutdb.Game{}, err
	}

	return created_game, nil
}

func (s *Store) findTeam(name string) (watchoutdb.Team, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	team, err := queries.FindTeam(ctx, pgtype.Text{String: name, Valid: true})

	if err != nil {
		return watchoutdb.Team{}, err
	}

	return team, nil

}
