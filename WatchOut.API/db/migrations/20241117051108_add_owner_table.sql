-- +goose Up
CREATE TABLE Owners (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    zip varchar(10),
    address varchar(255),
    city varchar(255),
    state varchar(255),
    country varchar(100),
    lat double precision,
    long double precision,
    hours TEXT,
    oid varchar(255) NOT NULL
);
ALTER TABLE Owners ADD UNIQUE (oid); 
-- +goose Down
DROP TABLE Owners;
