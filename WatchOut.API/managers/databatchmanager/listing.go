package databatchmanager

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"capstone.cs.utah.edu/watchout/utils/envutils"
)

func GetListingByState(state string, lid string) ([]byte, error) {
	envutils.LoadEnv()
	key := os.Getenv("TV_API_KEY")
	startUTC := time.Now().UTC()
	endUTC := startUTC.Add(23 * time.Hour)
	formatted_start := startUTC.Format("2006-01-02T15:04")
	formatted_end := endUTC.Format("2006-01-02T15:04")

	url := fmt.Sprintf("https://api.tvmedia.ca/tv/v4/lineups/%s/listings?api_key=%s&sportEventsOnly=sportEventsOnly&liveOnly=liveOnly&start=%s&end=%s", lid, key, formatted_start, formatted_end)

	response, err := http.Get(url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error occurred while making the request: %v\n", err)
		return nil, err
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error occurred while reading the request: %v\n", err)
	}

	return body, nil
}
