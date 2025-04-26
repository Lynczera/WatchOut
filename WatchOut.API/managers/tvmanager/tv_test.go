package tvmanager

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
	postgres_storage := db.NewPostgresStorage()
	defer postgres_storage.Conn.Close(context.Background())

	postgres_storage.CleanDB()
	code := m.Run()
	postgres_storage.CleanDB()
	os.Exit(code)
}

func TestGetTeam(t *testing.T) {
	postgres_storage := db.NewPostgresStorage()
	defer postgres_storage.Conn.Close(context.Background())

	store := NewStore(postgres_storage.Conn)
	randomInt := rand.Intn(100)
	randstring := strconv.Itoa(randomInt)

	testteam := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + randstring, Valid: true}}

	team, create_team_err := store.CreateTeam(testteam)

	assert.NotNil(t, team)

	if create_team_err != nil {

		t.Fatalf("error when creating team: %v", create_team_err)
	}

	get_test_team, get_team_err := store.FindTeam(testteam.Name.String)

	if get_team_err != nil {

		t.Fatalf("error when getting team: %v", get_team_err)

	}

	assert.Equal(t, testteam.Name, get_test_team.Name, "get team doesn't match team created")

}

func genRand() string {

	randomInt := rand.Intn(10000)
	randstring := strconv.Itoa(randomInt)

	return randstring
}

func TestGetGame(t *testing.T) {
	postgres_storage := db.NewPostgresStorage()
	defer postgres_storage.Conn.Close(context.Background())

	store := NewStore(postgres_storage.Conn)

	testteam1 := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + genRand(), Valid: true}, Tid: rand.Int31()}
	testteam2 := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + genRand(), Valid: true}, Tid: rand.Int31()}

	team1, create_team_err1 := store.CreateTeam(testteam1)
	team2, create_team_err2 := store.CreateTeam(testteam2)

	assert.NotNil(t, team1)
	assert.NotNil(t, team2)

	if create_team_err1 != nil {

		t.Fatalf("error when creating team: %v", create_team_err1)
	}
	if create_team_err2 != nil {

		t.Fatalf("error when creating team: %v", create_team_err2)
	}

	get_test_team1, get_team_err1 := store.FindTeam(testteam1.Name.String)
	get_test_team2, get_team_err2 := store.FindTeam(testteam2.Name.String)

	if get_team_err1 != nil {

		t.Fatalf("error getting team: %v", get_team_err1)
	}

	if get_team_err2 != nil {

		t.Fatalf("error getting team: %v", get_team_err2)
	}

	testgame := watchoutdb.Game{Time: pgtype.Timestamp{Time: time.Now(), Valid: true}, Type: genRand(), Title: genRand(), Team1: get_test_team1.Tid, Team2: get_test_team2.Tid}

	store.CreateGame(testgame)

	get_test_game, get_game_err := store.FindGamePrefix(testgame.Title, "1")

	if get_game_err != nil {

		t.Fatalf("error when getting game: %v", get_game_err)
	}

	assert.Equal(t, len(get_test_game), 1, "Wrong number of games retrieved")
	assert.Equal(t, get_test_game[0].Title, testgame.Title, "wrong game title")
	assert.Equal(t, get_test_game[0].Type, testgame.Type, "wrong game type")

}
