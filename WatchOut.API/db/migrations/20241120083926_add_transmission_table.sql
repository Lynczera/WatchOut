-- +goose Up
CREATE TABLE Transmissions (
    tid SERIAL PRIMARY KEY,
    description TEXT,
    owner varchar(255) NOT NULL,
    channel INT NOT NULL
);
ALTER TABLE Transmissions ADD FOREIGN KEY (owner) REFERENCES Owners(oid) ON DELETE CASCADE;  
ALTER TABLE Transmissions ADD UNIQUE (owner, channel);
ALTER TABLE Transmissions ADD FOREIGN KEY (channel) REFERENCES channels(cid) ON DELETE CASCADE; 


-- +goose Down
DROP TABLE Transmissions;
