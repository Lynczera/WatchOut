package serpapi

import (
	"context"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5/pgtype"
)

func CreateBar(name string, zip string, address string, city string, state string, country string, latitude float64, longitude float64, hours pgtype.Text) (watchoutdb.Owner, error) {
	postgresStore := db.NewPostgresStorage()
	defer postgresStore.Conn.Close(context.Background())

	store := NewStore(postgresStore.Conn)
	return store.CreateBar(name, zip, address, city, state, country, latitude, longitude, hours)
}

func GetBarByName(name string) (watchoutdb.Owner, error) {
	postgresStore := db.NewPostgresStorage()
	defer postgresStore.Conn.Close(context.Background())

	store := NewStore(postgresStore.Conn)
	return store.GetBarByName(name)
}

// func GetBarByAddress(address string) (watchoutdb.Bar, error) {
// 	postgresStore := db.NewPostgresStorage()
// 	defer postgresStore.Conn.Close(context.Background())
//
// 	store := NewStore(postgresStore.Conn)
// 	return store.FindBarByAddress(address)
// }
