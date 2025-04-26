package mediatvmanager

import (
	"fmt"
	"io"
	"os"
)

func GetListing() ([]byte, error) {

	//need to find a way to change base dir of running program?
	dir, direrr := os.Getwd()
	if direrr != nil {
		fmt.Println("Error getting current directory:", direrr)
		return nil, direrr
	}

	jsonFile, jsonerr := os.Open(dir + "/testdata/listing.json")

	if jsonerr != nil {
		fmt.Println("error open json:", jsonerr)
		return nil, jsonerr
	}

	defer jsonFile.Close()

	bytes, json_err := io.ReadAll(jsonFile)

	if json_err != nil {
		fmt.Println("error reading json:", json_err)
		return nil, json_err
	}

	return bytes, json_err

}
