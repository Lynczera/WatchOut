-- +goose Up
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    tid INT NOT NULL
);

ALTER TABLE Teams ADD UNIQUE (name);  
ALTER TABLE Teams ADD UNIQUE (tid);  
-- +goose Down
DROP TABLE Teams;
