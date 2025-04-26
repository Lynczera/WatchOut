include .env

db-dev-up:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_DEV} goose -dir=./db/migrations up

db-dev-reset:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_DEV} goose -dir=./db/migrations reset

db-dev-status:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_DEV} goose -dir=./db/migrations status


db-test-up:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_TEST} goose -dir=./db/migrations up

db-test-reset:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_TEST} goose -dir=./db/migrations reset

db-test-status:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_TEST} goose -dir=./db/migrations status

db-test-down:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_TEST} goose -dir=./db/migrations down-to $(VERSION)


db-local-up:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_LOCAL} goose -dir=./db/migrations up

db-local-reset:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_LOCAL} goose -dir=./db/migrations reset

db-local-status:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_LOCAL} goose -dir=./db/migrations status

db-local-down:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=${DBSTR_LOCAL} goose -dir=./db/migrations down-to $(VERSION)


