package usermanager

import (
	"context"

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
func (s *Store) CreateCustomer(c Customer) (watchoutdb.User, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	user, err := queries.CreateCustomer(ctx, watchoutdb.CreateCustomerParams{Name: c.Name, Zip: pgtype.Text{String: c.Zip, Valid: true}, Uid: c.AuthId})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding games %v", err)
		return watchoutdb.User{}, err
	}
	return user, nil
}
func (s *Store) GetGameLikeCount(name string) ([]watchoutdb.FindGameLikeCountRow, error) {
	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	games, err := queries.FindGameLikeCount(ctx, pgtype.Text{String: name, Valid: true})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding games %v", err)
		return []watchoutdb.FindGameLikeCountRow{}, err

	}
	return games, nil
}

func (s *Store) GetOwnerByname(name string) ([]watchoutdb.Owner, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	owner, err := queries.FindBarByName(ctx, pgtype.Text{String: name, Valid: true})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding owner %v", err)
		return []watchoutdb.Owner{}, err

	}
	return owner, nil

}

func (s *Store) GetUserById(uid string) (watchoutdb.User, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	user, err := queries.FindUserById(ctx, uid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding user %v", err)
		return watchoutdb.User{}, err

	}
	return user, nil

}

func (s *Store) GetOwnerById(oid string) (watchoutdb.Owner, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	owner, err := queries.FindOwnerById(ctx, oid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding owner %v", err)
		return watchoutdb.Owner{}, err

	}
	return owner, nil

}

///INTERESTS///

// /FAVORITE GAMES///
func (s *Store) FavoriteGame(user string, game int32) (watchoutdb.Favoritegame, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_favorite, err := queries.CreateFavoriteGame(ctx, watchoutdb.CreateFavoriteGameParams{Userid: user, Game: game})

	if err != nil {
		return watchoutdb.Favoritegame{}, err
	}

	return created_favorite, nil

}

func (s *Store) UnfavoriteGame(user string, gid int32) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteFavoriteGame(ctx, watchoutdb.DeleteFavoriteGameParams{Game: gid, Userid: user})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorite  %v", err)
		return err

	}

	return nil

}

func (s *Store) GetFavoriteGames(user string) ([]watchoutdb.FindFavoriteGameRow, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	favorites, err := queries.FindFavoriteGame(ctx, user)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorites %v", err)
		return []watchoutdb.FindFavoriteGameRow{}, err

	}
	return favorites, nil

}

// FAV TEAMS
func (s *Store) FavoriteTeam(user string, team int32) (watchoutdb.Favoriteteam, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_favorite, err := queries.CreateFavoriteTeam(ctx, watchoutdb.CreateFavoriteTeamParams{Userid: user, Team: team})

	if err != nil {
		return watchoutdb.Favoriteteam{}, err
	}

	return created_favorite, nil

}

func (s *Store) UnfavoriteTeam(user string, team int32) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteFavoriteTeam(ctx, watchoutdb.DeleteFavoriteTeamParams{Team: team, Userid: user})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorite  %v", err)
		return err

	}

	return nil

}

func (s *Store) GetFavoriteTeams(user string) ([]watchoutdb.FindFavoriteTeamRow, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	favorites, err := queries.FindFavoriteTeam(ctx, user)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorites %v", err)
		return []watchoutdb.FindFavoriteTeamRow{}, err

	}
	return favorites, nil

}

// FAV Owners
func (s *Store) FavoriteOwner(user string, owner string) (watchoutdb.Favoriteowner, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_favorite, err := queries.CreateFavoriteOwner(ctx, watchoutdb.CreateFavoriteOwnerParams{Userid: user, Ownerid: owner})

	if err != nil {
		return watchoutdb.Favoriteowner{}, err
	}

	return created_favorite, nil

}

func (s *Store) UnfavoriteOwner(user string, owner string) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteFavoriteOwner(ctx, watchoutdb.DeleteFavoriteOwnerParams{Ownerid: owner, Userid: user})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorite  %v", err)
		return err
	}

	return nil

}

func (s *Store) GetFavoriteOwners(user string) ([]watchoutdb.FindFavoriteOwnerRow, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	favorites, err := queries.FindFavoriteOwner(ctx, user)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorites %v", err)
		return []watchoutdb.FindFavoriteOwnerRow{}, err

	}
	return favorites, nil

}

// FAV Events
func (s *Store) FavoriteEvent(user string, event int32) (watchoutdb.Favoriteevent, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()
	created_favorite, err := queries.CreateFavoriteEvent(ctx, watchoutdb.CreateFavoriteEventParams{Userid: user, Event: event})

	if err != nil {
		return watchoutdb.Favoriteevent{}, err
	}

	return created_favorite, nil

}

func (s *Store) UnfavoriteEvent(user string, event int32) error {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	err := queries.DeleteFavoriteEvent(ctx, watchoutdb.DeleteFavoriteEventParams{Event: event, Userid: user})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorite  %v", err)
		return err

	}

	return nil

}

func (s *Store) GetFavoriteEvents(user string) ([]watchoutdb.FindFavoriteEventRow, error) {

	log := logrus.New()
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	favorites, err := queries.FindFavoriteEvent(ctx, user)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "Error finding favorites %v", err)
		return []watchoutdb.FindFavoriteEventRow{}, err

	}
	return favorites, nil

}
