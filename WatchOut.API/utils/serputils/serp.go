package serputils

import (
	"fmt"
	"os"

	"capstone.cs.utah.edu/watchout/utils/envutils"
	g "github.com/serpapi/google-search-results-golang"
)

type SerpAPIResponse struct {
	Places []Place `json:"places"`
}

type Place struct {
	Name        string  `json:"name"`
	Address     string  `json:"address"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	ClosingTime string  `json:"closing_time"`
}

// Returns lat, long
func GetBarCoords(name string, city string, state string, country string) (float64, float64, error) {
	params := map[string]string{
		"q":        name,
		"location": fmt.Sprintf("%s, %s, %s", city, state, country),
		"hl":       "en",
		"gl":       "us",
		"engine":   "google_local",
	}

	envutils.LoadEnv()

	search := g.NewGoogleSearch(params, os.Getenv("SERP_API_KEY"))
	res, _ := search.GetJSON()
	local_results, ok1 := res["local_results"].([]any)

	if !ok1 || len(local_results) < 1 {
		return .0, .0, fmt.Errorf("Couldnt find place")
	}

	place, ok2 := local_results[0].(map[string]any)

	if !ok2 {
		return .0, .0, fmt.Errorf("error parsing place")
	}

	coods, ok3 := place["gps_coordinates"].(map[string]any)

	if !ok3 {
		return .0, .0, fmt.Errorf("No gps_coordinates")
	}

	return coods["latitude"].(float64), coods["longitude"].(float64), nil
}
