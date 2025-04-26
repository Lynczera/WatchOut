package usermanager

import (
	"context"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/utils/timeutils"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/sirupsen/logrus"
)

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

func CreateOwner(Name string, Zip string, Address string, City string, State string, Country string, Lat float64, Long float64, Hours string, authid string) (watchoutdb.Owner, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	owner, err := store.CreateOwner(Owner{Name: Name, Zip: Zip, Address: Address, City: City, State: State, Country: Country, Lat: Lat, Long: Long, Hours: Hours, AuthId: authid})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return watchoutdb.Owner{}, err
	}

	return owner, nil
}
func CreateCustomer(Name string, Zip string, authid string) (watchoutdb.User, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	log.Logf(logrus.InfoLevel, "customer is %s", Name)
	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	customer, err := store.CreateCustomer(Customer{Name: Name, Zip: Zip, AuthId: authid})

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return watchoutdb.User{}, err
	}

	return customer, nil
}

type FindGameLikeCountRowMod struct {
	watchoutdb.FindGameLikeCountRow
	ParsedTime string
}

func GetGameLikeCount(title string, utc string) ([]FindGameLikeCountRowMod, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	games, err := store.GetGameLikeCount(title)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return []FindGameLikeCountRowMod{}, err
	}
	var mod_games []FindGameLikeCountRowMod

	for _, g := range games {
		mod_games = append(mod_games, FindGameLikeCountRowMod{FindGameLikeCountRow: g, ParsedTime: timeutils.ConvTime(g.Time, utc)})
	}

	return mod_games, nil
}

func GetUserById(uid string) (watchoutdb.User, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	user, err := store.GetUserById(uid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return watchoutdb.User{}, err
	}

	return user, nil
}

func GetOwnerById(oid string) (watchoutdb.Owner, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	owner, err := store.GetOwnerById(oid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return watchoutdb.Owner{}, err
	}

	return owner, nil
}

func GetOwnerByName(ownerName string) ([]watchoutdb.Owner, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	owners, err := store.GetOwnerByname(ownerName)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error getting owners by name: %v", err)
		return []watchoutdb.Owner{}, err
	}

	return owners, nil

}

/// FAVORITES Games///

func FavoriteGame(uid string, gid int) (watchoutdb.Favoritegame, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorite, fav_err := store.FavoriteGame(uid, int32(gid))

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating favorite: %v", fav_err)
		return watchoutdb.Favoritegame{}, fav_err

	}

	return favorite, nil
}

func UnfavoriteGame(user string, game int32) error {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.UnfavoriteGame(user, game)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error deleting favorite %v", err)
		return err
	}

	return nil
}

type FindFavoriteGameModRow struct {
	watchoutdb.FindFavoriteGameRow
	ParsedTime string
}

func GetFavoriteGames(uID string, utc string) ([]FindFavoriteGameModRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorites, fav_err := store.GetFavoriteGames(uID)

	var mod_favs []FindFavoriteGameModRow
	for _, fg := range favorites {
		mod_favs = append(mod_favs, FindFavoriteGameModRow{FindFavoriteGameRow: fg, ParsedTime: timeutils.ConvTime(fg.Gametime, utc)})
	}

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting favorites by userid: %v", fav_err)
		return []FindFavoriteGameModRow{}, fav_err
	}

	return mod_favs, nil
}

/// FAVORITES Teams///

func FavoriteTeams(uid string, tid int) (watchoutdb.Favoriteteam, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorite, fav_err := store.FavoriteTeam(uid, int32(tid))

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating favorite: %v", fav_err)
		return watchoutdb.Favoriteteam{}, fav_err

	}

	return favorite, nil
}

func UnfavoriteTeam(user string, team int32) error {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.UnfavoriteTeam(user, team)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error deleting favorite %v", err)
		return err
	}

	return nil
}

func GetFavoriteTeams(uID string) ([]watchoutdb.FindFavoriteTeamRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorites, fav_err := store.GetFavoriteTeams(uID)

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting favorites by userid: %v", fav_err)
		return []watchoutdb.FindFavoriteTeamRow{}, fav_err
	}

	return favorites, nil
}

/// FAVORITES Owners///

func FavoriteOwners(uid string, oid string) (watchoutdb.Favoriteowner, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorite, fav_err := store.FavoriteOwner(uid, oid)

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating favorite: %v", fav_err)
		return watchoutdb.Favoriteowner{}, fav_err

	}

	return favorite, nil
}

func UnfavoriteOwner(user string, owner string) error {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.UnfavoriteOwner(user, owner)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error deleting favorite %v", err)
		return err
	}

	return nil
}

func GetFavoriteOwners(uID string) ([]watchoutdb.FindFavoriteOwnerRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorites, fav_err := store.GetFavoriteOwners(uID)

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting favorites by userid: %v", fav_err)
		return []watchoutdb.FindFavoriteOwnerRow{}, fav_err
	}

	return favorites, nil
}

/// FAVORITES Events///

func FavoriteEvents(uid string, eid int) (watchoutdb.Favoriteevent, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorite, fav_err := store.FavoriteEvent(uid, int32(eid))

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating favorite: %v", fav_err)
		return watchoutdb.Favoriteevent{}, fav_err

	}

	return favorite, nil
}

func UnfavoriteEvent(user string, event int32) error {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.UnfavoriteEvent(user, event)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error deleting favorite %v", err)
		return err
	}

	return nil
}

type FindFavoriteEventRowMod struct {
	watchoutdb.FindFavoriteEventRow
	ParsedTime string
}

func GetFavoriteEvents(uID string, utc string) ([]FindFavoriteEventRowMod, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	favorites, fav_err := store.GetFavoriteEvents(uID)

	if fav_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting favorites by userid: %v", fav_err)
		return []FindFavoriteEventRowMod{}, fav_err
	}

	var res []FindFavoriteEventRowMod
	for _, f := range favorites {
		res = append(res, FindFavoriteEventRowMod{FindFavoriteEventRow: f, ParsedTime: timeutils.ConvTime(f.Time, utc)})
	}

	return res, nil
}
