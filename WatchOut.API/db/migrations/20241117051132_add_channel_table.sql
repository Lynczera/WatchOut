-- +goose Up
CREATE TABLE Channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    cid INT NOT NULL
);

ALTER TABLE Channels ADD UNIQUE (name);  
ALTER TABLE Channels ADD UNIQUE (cid);  
-- +goose Down
DROP TABLE Channels;
