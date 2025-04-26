package eventmanager

import (
	"context"
	"math/rand"
	"os"
	"strconv"
	"testing"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/jackc/pgx/v5/pgtype"
)

func genRand() string {

	randomInt := rand.Intn(10000)
	randstring := strconv.Itoa(randomInt)

	return randstring
}

func TestMain(m *testing.M) {
	postgres_storage := db.NewPostgresStorage()
	defer postgres_storage.Conn.Close(context.Background())

	postgres_storage.CleanDB()
	code := m.Run()
	postgres_storage.CleanDB()
	os.Exit(code)
}

// func TestGetEventByTitle(t *testing.T) {
//
// 	postgres_storage := db.NewPostgresStorage()
// 	defer postgres_storage.Conn.Close(context.Background())
//
// 	store := NewStore(postgres_storage.Conn)
//
// 	testteam1 := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + genRand(), Valid: true}, Tid: rand.Int31()}
// 	testteam2 := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + genRand(), Valid: true}, Tid: rand.Int31()}
//
// 	team1, create_team_err1 := store.CreateTeam(testteam1)
// 	team2, create_team_err2 := store.CreateTeam(testteam2)
//
// 	if create_team_err1 != nil {
//
// 		t.Fatalf("error when creating team: %v", create_team_err1)
// 	}
// 	if create_team_err2 != nil {
//
// 		t.Fatalf("error when creating team: %v", create_team_err2)
// 	}
//
// 	id := rand.Int31()
// 	testgame := watchoutdb.Game{Time: pgtype.Timestamp{Time: time.Now(), Valid: true}, Type: genRand(), Title: genRand(), Team1: team1.Tid, Team2: team2.Tid, Gid: id}
//
// 	game, game_err := store.CreateGame(testgame)
//
// 	if game_err != nil {
//
// 		t.Fatalf("error when creating game: %v", game_err)
// 	}
//
// 	// type Owner struct {
// 	// 	AuthId  string
// 	// 	Name    string
// 	// 	Zip     string
// 	// 	Address string
// 	// 	City    string
// 	// 	State   string
// 	// 	Country string
// 	// 	Lat     float64
// 	// 	Long    float64
// 	// 	Hours   string
// 	// }
// 	testowner := Owner{Name: genRand(), Zip: genRand(), Address: genRand(), AuthId: genRand()}
//
// 	owner, owner_err := store.CreateOwner(testowner)
// 	if owner_err != nil {
//
// 		t.Fatalf("error when creating owner: %v", owner_err)
// 	}
//
// 	// testevent := watchoutdb.Team{Name: pgtype.Text{String: "testteam" + randstring, Valid: true}}
// 	testevent := watchoutdb.Event{Title: pgtype.Text{String: genRand(), Valid: true}, Description: pgtype.Text{String: genRand(), Valid: true}, Time: pgtype.Timestamp{Time: time.Now(), Valid: true}, Game: game.Gid, Owner: owner.Oid}
//
// 	_, create_event_err := store.CreateEvent(testevent.Title.String, testevent.Description.String, testevent.Time.Time, int(game.Gid), owner.Oid)
//
// 	if create_event_err != nil {
//
// 		t.Fatalf("error when creating event: %v", create_event_err)
// 	}
//
// 	find_event, find_event_err := store.FindEventByGameTitle(game.Title)
//
// 	if find_event_err != nil {
//
// 		t.Fatalf("error when finding event: %v", find_event_err)
//
// 	}
//
// 	assert.Len(t, find_event, 1)
// }

func TestStartTransmission(t *testing.T) {
	postgres_storage := db.NewPostgresStorage()
	defer postgres_storage.Conn.Close(context.Background())

	store := NewStore(postgres_storage.Conn)

	testchannel := watchoutdb.Channel{Name: pgtype.Text{String: genRand(), Valid: true}}
	channel, channel_err := store.CreateChannel(testchannel)
	if channel_err != nil {
		t.Fatalf("error when creating channel: %v", channel_err)
	}

	testowner := Owner{Name: genRand(), Zip: genRand(), Address: genRand(), AuthId: genRand()}
	owner, owner_err := store.CreateOwner(testowner)
	if owner_err != nil {
		t.Fatalf("error when creating owner: %v", owner_err)
	}

	testTransmission := watchoutdb.Transmission{Description: pgtype.Text{String: genRand(), Valid: true}, Owner: owner.Oid, Channel: channel.Cid}

	transmission, startTrans_err := store.CreateTransmission(int(channel.Cid), testTransmission.Description.String, owner.Oid)
	if startTrans_err != nil {
		t.Fatalf("error when creating transmission: %v", startTrans_err)
	}

	if transmission.Description.String != testTransmission.Description.String {
		t.Errorf("Expected description %v, got %v", testTransmission.Description.String, transmission.Description.String)
	}
	if transmission.Owner != owner.Oid {
		t.Errorf("Expected owner %v, got %v", owner.Oid, transmission.Owner)
	}
	if transmission.Channel != channel.Cid {
		t.Errorf("Expected channel %v, got %v", channel.Cid, transmission.Channel)
	}

}
