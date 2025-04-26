package serpapi

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
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

func SearchBar(name, address string) ([]Place, error) {
	apiKey := ""
	query := fmt.Sprintf("%s %s", name, address)
	encodedQuery := url.QueryEscape(query)

	url := fmt.Sprintf("https://serpapi.com/search.json?q=%s&api_key=%s", encodedQuery, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result SerpAPIResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return result.Places, nil
}
