package healthtests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"capstone.cs.utah.edu/watchout/app"
	"capstone.cs.utah.edu/watchout/utils/envutils"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestHealthCheck(t *testing.T) {

	router, err := app.Setup()

	assert.Equal(t, nil, err, "Error should be nil")

	w := httptest.NewRecorder()

	envutils.LoadEnv()

	req, _ := http.NewRequest("GET", "/health/check", nil)
	req.Header.Set("wo_api_key", os.Getenv("WO_API_KEY"))

	router.ServeHTTP(w, req)

	res, err := json.Marshal(gin.H{"msg": "ok"})

	assert.Equal(t, nil, err, "Error should be nil")

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, string(res), w.Body.String())

}

func TestFailHealthCheck(t *testing.T) {

	router, err := app.Setup()

	assert.Equal(t, nil, err, "Error should be nil")

	w := httptest.NewRecorder()

	req, _ := http.NewRequest("GET", "/health/fail", nil)

	envutils.LoadEnv()

	req.Header.Set("wo_api_key", os.Getenv("WO_API_KEY"))
	router.ServeHTTP(w, req)

	res, err := json.Marshal(gin.H{"msg": "Forced server fail"})

	assert.Equal(t, nil, err, "Error should be nil")

	assert.Equal(t, 500, w.Code)
	assert.Equal(t, string(res), w.Body.String())

}
