-- +goose Up
CREATE TABLE FavoriteTeams (
    fid SERIAL PRIMARY KEY,
    team INT NOT NULL,
    userid varchar(255) NOT NULL
);

ALTER TABLE FavoriteTeams ADD FOREIGN KEY (team) REFERENCES Teams(tid) ON DELETE CASCADE;  
ALTER TABLE FavoriteTeams ADD FOREIGN KEY (userid) REFERENCES Users(uid) ON DELETE CASCADE;  
ALTER TABLE FavoriteTeams ADD UNIQUE (team, userid);  


-- +goose Down
DROP TABLE FavoriteTeams;
