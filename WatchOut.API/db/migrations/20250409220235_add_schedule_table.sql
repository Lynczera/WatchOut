-- +goose Up
CREATE TABLE Schedules (
    id SERIAL PRIMARY KEY,
    game INT NOT NULL,
    channel INT NOT NULL,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL
);

ALTER TABLE Schedules ADD UNIQUE (game, channel);
ALTER TABLE Schedules ADD FOREIGN KEY (game) REFERENCES Games(gid) ON DELETE CASCADE;  
ALTER TABLE Schedules ADD FOREIGN KEY (channel) REFERENCES Channels(cid) ON DELETE CASCADE;  


-- +goose Down
DROP TABLE Schedules;

