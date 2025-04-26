package db

import (
	"context"
	"os"

	"capstone.cs.utah.edu/watchout/utils/envutils"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5"
	"github.com/sirupsen/logrus"
)

type PostgresStorage struct {
	Conn *pgx.Conn
}

func NewPostgresStorage() *PostgresStorage {
	envutils.LoadEnv()

	log := logrus.New()
	ctx := context.Background()

	dbstr := ""
	env := os.Getenv("APP_ENV")

	if env == "LOCAL" {
		dbstr = os.Getenv("DBSTR_LOCAL")
	} else if env == "DEV" {
		dbstr = os.Getenv("DBSTR_DEV")

	} else {
		dbstr = os.Getenv("DBSTR_TEST")
	}

	conn, err := pgx.Connect(ctx, dbstr)

	if err != nil {

		log.Fatal(logrus.ErrorLevel, " unable to connect to database, error: %v\n", err)

	}

	return &PostgresStorage{Conn: conn}
}

// Specific for batching
func (p *PostgresStorage) CleanBeforeBatch() error {
	queries := watchoutdb.New(p.Conn)
	ctx := context.Background()

	err_gam := queries.DeleteAllGames(ctx)
	if err_gam != nil {
		return err_gam
	}
	return nil
}

// Specific for saving storage when testing
func (p *PostgresStorage) CleanDB() error {
	queries := watchoutdb.New(p.Conn)
	ctx := context.Background()

	err_user := queries.DeleteAllUsers(ctx)
	if err_user != nil {
		return err_user
	}
	err_owner := queries.DeleteAllOwners(ctx)
	if err_owner != nil {
		return err_owner
	}
	err_team := queries.DeleteAllTeams(ctx)
	if err_team != nil {
		return err_team
	}
	err_channel := queries.DeleteAllChannels(ctx)
	if err_channel != nil {
		return err_channel
	}
	err_event := queries.DeleteAllEvents(ctx)
	if err_event != nil {
		return err_event
	}
	err_fav := queries.DeleteAllFavorites(ctx)
	if err_fav != nil {
		return err_fav
	}
	err_gam := queries.DeleteAllGames(ctx)
	if err_gam != nil {
		return err_gam
	}
	err_trans := queries.DeleteAllTransmissions(ctx)
	if err_trans != nil {
		return err_trans
	}

	return nil
}
