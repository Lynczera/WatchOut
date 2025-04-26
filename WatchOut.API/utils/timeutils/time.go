package timeutils

import (
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func ConvTime(t pgtype.Timestamp, utc string) string {
	friendlyLayout := "Monday, January 2, 2006 at 3:04 PM"

	loc, _ := time.LoadLocation(utc)
	converted := t.Time.In(loc)

	friendlyString := converted.Format(friendlyLayout)
	return friendlyString
}

