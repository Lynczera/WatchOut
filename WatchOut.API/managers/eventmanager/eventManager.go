package eventmanager

import (
	"context"
	"time"

	"capstone.cs.utah.edu/watchout/db"
	"capstone.cs.utah.edu/watchout/utils/timeutils"
	"capstone.cs.utah.edu/watchout/watchoutdb"
	"github.com/sirupsen/logrus"
)

func CreateEvent(eventTitle string, eventDescription string, eventTime time.Time, gameid int32, ownerid string) (watchoutdb.Event, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	event, event_err := store.CreateEvent(eventTitle, eventDescription, eventTime, int(gameid), ownerid)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating event: %v", event_err)
		return watchoutdb.Event{}, event_err

	}
	return event, nil

}

func DeleteEventById(eid int32) error {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.DeleteEventById(eid)

	if err != nil {
		log.Logf(logrus.ErrorLevel, "error deleting event %v", err)
		return err
	}

	return nil
}

type FindEventsByOwnerModifiedRow struct {
	watchoutdb.FindEventsByOwnerRow
	ParsedTime string
}

func GetEventsByOwner(owner string, utc string) ([]FindEventsByOwnerModifiedRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	events, event_err := store.FindEventsByOwner(owner)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting events by owner: %v", event_err)
		return []FindEventsByOwnerModifiedRow{}, event_err
	}

	var mod_events []FindEventsByOwnerModifiedRow
	for _, e := range events {
		mod_events = append(mod_events, FindEventsByOwnerModifiedRow{ParsedTime: timeutils.ConvTime(e.Time, utc), FindEventsByOwnerRow: e})
	}

	return mod_events, nil

}

func GetEventLikeCount(eid int) (int64, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	count, event_err := store.GetEventLikeCount(eid)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting events by title: %v", event_err)
		return -1, event_err
	}

	return count, nil

}

func GetEventsByGameTitle(gameTitle string) ([]watchoutdb.FindEventByGameTitleRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	events, event_err := store.FindEventByGameTitle(gameTitle)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting events by title: %v", event_err)
		return []watchoutdb.FindEventByGameTitleRow{}, event_err
	}

	return events, nil

}

type FindEventByGameIdModifiedRow struct {
	watchoutdb.FindEventByGameIdRow
	ParsedTime string
}

func GetEventsByGameId(gID int, utc string, uid string) ([]FindEventByGameIdModifiedRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	events, event_err := store.FindEventsByGameId(gID, uid)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting events by gameid: %v", event_err)
		return []FindEventByGameIdModifiedRow{}, event_err
	}

	var mod_events []FindEventByGameIdModifiedRow

	for _, e := range events {
		mod_events = append(mod_events, FindEventByGameIdModifiedRow{ParsedTime: timeutils.ConvTime(e.Time, utc), FindEventByGameIdRow: e})
	}

	return mod_events, nil
}

type FindEventByTitleModifiedRow struct {
	watchoutdb.FindEventByTitleRow
	ParsedTime string
}

func GetEventsByTitle(title string, utc string) ([]FindEventByTitleModifiedRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	events, event_err := store.GetEventsByTitle(title)

	if event_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting events by title: %v", event_err)
		return []FindEventByTitleModifiedRow{}, event_err
	}
	var mod_events []FindEventByTitleModifiedRow
	for _, e := range events {
		mod_events = append(mod_events, FindEventByTitleModifiedRow{FindEventByTitleRow: e, ParsedTime: timeutils.ConvTime(e.Time, utc)})
	}

	return mod_events, nil
}

func StartTransmission(transmissionDescription string, channelid int32, ownerid string) (watchoutdb.Transmission, error) {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	transmission, transmission_err := store.CreateTransmission(int(channelid), transmissionDescription, ownerid)

	if transmission_err != nil {

		log.Logf(logrus.ErrorLevel, "error creating transmission: %v", transmission_err)
		return watchoutdb.Transmission{}, transmission_err

	}

	return transmission, nil
}

func StopTransmission(tid int32) error {
	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	err := store.DeleteTransmission(tid)

	if err != nil {

		log.Logf(logrus.ErrorLevel, "error deleting transmission: %s", err)
		return err
	}

	return nil
}

func GetTransmissionsByOwner(owner string) ([]watchoutdb.FindTransmissionsByOwnerRow, error) {

	postgres_store := db.NewPostgresStorage()
	log := logrus.New()

	defer postgres_store.Conn.Close(context.Background())

	store := NewStore(postgres_store.Conn)

	transmissions, trans_err := store.FindTransmissionsByOwner(owner)

	if trans_err != nil {

		log.Logf(logrus.ErrorLevel, "error getting transmissions by owner: %v", trans_err)
		return []watchoutdb.FindTransmissionsByOwnerRow{}, trans_err
	}

	return transmissions, nil
}
