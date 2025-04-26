package serpapi

import (
	"context"
	"math/rand"
	"os"
	"strconv"
	"testing"
	"time"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	postgresStorage := db.NewPostgresStorage()
	defer postgresStorage.Conn.Close(context.Background())

	postgresStorage.CleanDB()
	code := m.Run()
	postgresStorage.CleanDB()
	os.Exit(code)
}

func TestCreateBar(t *testing.T) {
	postgresStorage := db.NewPostgresStorage()
	defer postgresStorage.Conn.Close(context.Background())

	store := NewStore(postgresStorage.Conn)
	randomInt := rand.Intn(100)
	randstring := strconv.Itoa(randomInt)
	timeString := time.Now().Format(time.RFC3339)

	testBar := watchoutdb.Owner{
		Name:    pgtype.Text{String: "testbar" + randstring, Valid: true},
		Zip:     pgtype.Text{String: "", Valid: true},
		Address: pgtype.Text{String: "123 Test St", Valid: true},
		State:   pgtype.Text{Valid: true, String: ""},
		Country: pgtype.Text{Valid: true, String: ""},
		Lat:     pgtype.Float8{Valid: true, Float64: 40.7128},
		Long:    pgtype.Float8{Valid: true, Float64: -74.0060},
		Hours:   pgtype.Text{Valid: true, String: timeString},
	}

	bar, err := store.CreateBar(testBar.Name.String, testBar.Zip.String, testBar.Address.String, testBar.City.String, testBar.State.String, testBar.Country.String, testBar.Lat.Float64, testBar.Long.Float64, pgtype.Text{String: testBar.Hours.String, Valid: true})
	assert.NotNil(t, bar)
	assert.NoError(t, err)
}
