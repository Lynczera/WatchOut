package serpapi

import (
	"context"
	"fmt"

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

func (s *Store) CreateBar(name string, zip string, address string, city string, state string, country string, latitude float64, longitude float64, hours pgtype.Text) (watchoutdb.Owner, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	createdBar, err := queries.CreateOwner(ctx,
		watchoutdb.CreateOwnerParams{
			Name:    pgtype.Text{String: name, Valid: true},
			Address: pgtype.Text{String: address, Valid: true},
			City:    pgtype.Text{String: city, Valid: true},
			State:   pgtype.Text{Valid: true, String: state},
			Country: pgtype.Text{Valid: true, String: country},
			Lat:     pgtype.Float8{Valid: true, Float64: latitude},
			Long:    pgtype.Float8{Valid: true, Float64: longitude},
			Hours:   pgtype.Text{Valid: true, String: hours.String},
		})

	if err != nil {
		fmt.Printf("Error creating bar: %v", err)
		return watchoutdb.Owner{}, err
	}

	return createdBar, nil
}

func (s *Store) GetBarByName(name string) (watchoutdb.Owner, error) {
	queries := watchoutdb.New(s.db)
	ctx := context.Background()

	bars, err := queries.FindOwnerByName(ctx, pgtype.Text{String: name})
	if err != nil {
		return watchoutdb.Owner{}, err
	}

	return bars, nil
}

// func (s *Store) FindBarByAddress(address string) (watchoutdb.Owner, error) {
// 	queries := watchoutdb.New(s.db)
// 	ctx := context.Background()
//
// 	bars, err := queries.GetBarByAddress(ctx, address)
// 	if err != nil {
// 		return watchoutdb.Bar{}, err
// 	}
//
// 	return bars, nil
// }
