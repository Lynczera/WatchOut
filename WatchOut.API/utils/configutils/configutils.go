package configutils

import (
	"encoding/json"
	"fmt"
	"os"
)

type Configuration struct {
	Certificate_path     string
	Certificate_key_path string
}

func Config() Configuration {

	file, _ := os.Open("local-config.json")
	defer file.Close()
	decoder := json.NewDecoder(file)
	configuration := Configuration{}
	err := decoder.Decode(&configuration)
	if err != nil {
		fmt.Println("error:", err)
	}
	return configuration
}
