-- +goose Up
CREATE TABLE Events (
    eid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    time TIMESTAMP,
    game INT NOT NULL,
    owner varchar(255) NOT NULL
);

ALTER TABLE Events ADD FOREIGN KEY (game) REFERENCES Games(gid) ON DELETE CASCADE;  
ALTER TABLE Events ADD FOREIGN KEY (owner) REFERENCES Owners(oid) ON DELETE CASCADE;  

ALTER TABLE Events ADD UNIQUE (game,owner);  

-- +goose Down
DROP TABLE Events;
