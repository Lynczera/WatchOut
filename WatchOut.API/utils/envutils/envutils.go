package envutils

import (
	"fmt"
	"os"
	"regexp"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

const projectDirName = "WatchOut.API"

// LoadEnv loads env vars from .env
func LoadEnv() {
	re := regexp.MustCompile(`^(.*` + projectDirName + `)`)
	cwd, _ := os.Getwd()
	rootPath := re.Find([]byte(cwd))
	fmt.Printf("getting env from %v /.env",cwd)
	//try if env is local
	err := godotenv.Load(string(rootPath) + `/.env`)
	if err != nil {
		log.WithFields(log.Fields{
			"cause": err,
			"cwd":   cwd,
		}).Print()

		//try if env is dev
		err2 := godotenv.Load("/env/.env")

		if err2 != nil {
			log.WithFields(log.Fields{
				"cause": err2,
				"cwd":   "/env/.env",
			}).Fatal("Problem loading .env file")

			os.Exit(-1)
		}
	}
}
