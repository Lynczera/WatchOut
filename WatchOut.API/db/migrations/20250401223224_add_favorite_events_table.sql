-- +goose Up
CREATE TABLE FavoriteEvents (
    fid SERIAL PRIMARY KEY,
    event INT NOT NULL,
    userid varchar(255) NOT NULL
);

ALTER TABLE FavoriteEvents ADD FOREIGN KEY (event) REFERENCES Events(eid) ON DELETE CASCADE;  
ALTER TABLE FavoriteEvents ADD FOREIGN KEY (userid) REFERENCES Users(uid) ON DELETE CASCADE;  
ALTER TABLE FavoriteEvents ADD UNIQUE (event, userid);  


-- +goose Down
DROP TABLE FavoriteEvents;
