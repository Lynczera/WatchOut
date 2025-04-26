-- +goose Up
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    zip VARCHAR(10),
    uid VARCHAR(255) NOT NULL
);
ALTER TABLE Users ADD UNIQUE (uid); 

-- +goose Down
DROP TABLE Users;
