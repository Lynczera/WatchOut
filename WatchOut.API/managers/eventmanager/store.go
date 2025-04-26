package eventmanager

import (
	"context"
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

type Owner struct {
	AuthId  string
	Name    string
	Zip     string
	Address string
	City    string
	State   string
	Country string
	Lat     float64
	Long    float64
	Hours   string
}

type Customer struct {
	AuthId string
	Name   string
	Zip    string
}

func (s *Store) CreateEvent(title string, description string, time time.Time, game int, owner string) (watchoutdb.Event, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	created_event, err := queries.CreateEvent(
		ctx,
		watchoutdb.CreateEventParams{
			Title:       pgtype.Text{String: title, Valid: true},
			Description: pgtype.Text{String: description, Valid: true},
			Time:        pgtype.Timestamp{Time: time, Valid: true},
			Game:        int32(game),
			Owner:       owner,
		},
	)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error creating event %v", err)
		return watchoutdb.Event{}, err

	}
	return created_event, nil

}

func (s *Store) DeleteEventById(eid int32) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteEventById(ctx, eid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding owner %v", err)
		return err

	}

	return nil

}

func (s *Store) FindOwnerByName(owner string) (watchoutdb.Owner, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	owner_res, err := queries.FindOwnerByName(ctx, pgtype.Text{String: owner, Valid: true})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding owner %v", err)
		return watchoutdb.Owner{}, err

	}

	return owner_res, nil
}

func (s *Store) FindGameByTitle(gameTitle string) (watchoutdb.Game, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	game, err := queries.FindGameByTitle(ctx, gameTitle)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding game %v", err)
		return watchoutdb.Game{}, err
	}

	return game, nil
}

func (s *Store) GetEventLikeCount(eid int) (int64, error) {
	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	count, err := queries.GetEventLikeCount(ctx, int32(eid))

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding game %v", err)
		return -1, err
	}

	return count, nil

}
func (s *Store) FindEventsByGameId(gID int, uid string) ([]watchoutdb.FindEventByGameIdRow, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	events, err := queries.FindEventByGameId(ctx, watchoutdb.FindEventByGameIdParams{Game: int32(gID), Userid: uid})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding games for the id %v", err)
		return []watchoutdb.FindEventByGameIdRow{}, err
	}

	return events, nil
}

func (s *Store) FindEventsByOwner(owner string) ([]watchoutdb.FindEventsByOwnerRow, error) {
	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	events, err := queries.FindEventsByOwner(ctx, owner)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding events for owner %v", err)
		return []watchoutdb.FindEventsByOwnerRow{}, err

	}

	return events, nil

}
func (s *Store) FindEventByGameTitle(gameTitle string) ([]watchoutdb.FindEventByGameTitleRow, error) {
	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	events, err := queries.FindEventByGameTitle(ctx, gameTitle)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding events by title %v", err)
		return []watchoutdb.FindEventByGameTitleRow{}, nil
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

func (s *Store) CreateOwner(Owner Owner) (watchoutdb.Owner, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	owner, err := queries.CreateOwner(ctx, watchoutdb.CreateOwnerParams{Name: pgtype.Text{String: Owner.Name, Valid: true}, Zip: pgtype.Text{String: Owner.Zip, Valid: true}, Address: pgtype.Text{String: Owner.Address, Valid: true}, City: pgtype.Text{String: Owner.City, Valid: true}, State: pgtype.Text{Valid: true, String: Owner.State},
		Country: pgtype.Text{Valid: true, String: Owner.Country}, Lat: pgtype.Float8{Valid: true, Float64: Owner.Lat}, Long: pgtype.Float8{Valid: true, Float64: Owner.Long}, Hours: pgtype.Text{Valid: true, String: Owner.Hours}, Oid: Owner.AuthId})
	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding games %v", err)
		return watchoutdb.Owner{}, err
	}
	return owner, nil
}

func (s *Store) GetEventsByTitle(title string) ([]watchoutdb.FindEventByTitleRow, error) {

	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	events, err := queries.FindEventByTitle(ctx, pgtype.Text{String: title, Valid: true})

	if err != nil {
		return []watchoutdb.FindEventByTitleRow{}, err
	}

	return events, nil
}

func (s *Store) CreateTransmission(channel int, description string, owner string) (watchoutdb.Transmission, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	created_transmission, err := queries.CreateTransmission(
		ctx,
		watchoutdb.CreateTransmissionParams{
			Description: pgtype.Text{String: description, Valid: true},
			Owner:       owner,
			Channel:     int32(channel),
		},
	)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error creating transmission %v", err)
		return watchoutdb.Transmission{}, err

	}
	return created_transmission, nil

}

func (s *Store) DeleteTransmission(tid int32) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteTransmission(
		ctx, tid,
	)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error creating transmission %v", err)
		return err

	}
	return nil

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

func (s *Store) FindChannelByName(channel string) (watchoutdb.Channel, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	channel_res, err := queries.FindChannelByName(ctx, pgtype.Text{String: channel, Valid: true})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding channel %v", err)
		return watchoutdb.Channel{}, err

	}

	return channel_res, nil
}

func (s *Store) FindTransmissionsByOwner(owner string) ([]watchoutdb.FindTransmissionsByOwnerRow, error) {
	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	transmissions, err := queries.FindTransmissionsByOwner(ctx, owner)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding transmissions %v", err)
		return []watchoutdb.FindTransmissionsByOwnerRow{}, err

	}

	return transmissions, nil

}
