package main

import (
	"os"
	"time"

	"capstone.cs.utah.edu/watchout/app"
	"capstone.cs.utah.edu/watchout/managers/databatchmanager"
	"capstone.cs.utah.edu/watchout/utils/envutils"
	"github.com/sirupsen/logrus"
)

func TimedBatching(l *logrus.Logger) {

	databatchmanager.BatchData()
	l.Logf(logrus.InfoLevel, "Data Batched")
	ticker := time.NewTicker(24 * time.Hour)
	defer ticker.Stop()

	for range ticker.C {
		databatchmanager.BatchData()
		l.Logf(logrus.InfoLevel, "Data Batched")
	}
}

func main() {
	r, err := app.Setup()
	log := logrus.New()

	if err != nil {
		panic(err)
	}

	envutils.LoadEnv()

	if os.Getenv("APP_ENV") == "DEV" {
		go TimedBatching(log)
		log.Logf(logrus.InfoLevel, "Running in DEV")
		tls_err := r.Run(":3000")
		if tls_err != nil {
			panic(tls_err)
		}
	} else {
		log.Logf(logrus.InfoLevel, "Running in LOCAL")
		tls_err := r.Run(":3000")
		if tls_err != nil {
			panic(tls_err)
		}
	}

}
