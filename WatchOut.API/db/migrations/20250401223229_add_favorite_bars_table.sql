-- +goose Up
CREATE TABLE FavoriteOwners (
    fid SERIAL PRIMARY KEY,
    ownerid varchar(255) NOT NULL,
    userid varchar(255) NOT NULL
);

ALTER TABLE FavoriteOwners ADD FOREIGN KEY (ownerid) REFERENCES Owners(oid) ON DELETE CASCADE;  
ALTER TABLE FavoriteOwners ADD FOREIGN KEY (userid) REFERENCES Users(uid) ON DELETE CASCADE;  
ALTER TABLE FavoriteOwners ADD UNIQUE (ownerid, userid);  


-- +goose Down
DROP TABLE FavoriteOwners;
