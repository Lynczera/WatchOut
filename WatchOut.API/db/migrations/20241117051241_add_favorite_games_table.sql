-- +goose Up
CREATE TABLE FavoriteGames (
    fid SERIAL PRIMARY KEY,
    game INT NOT NULL,
    userid varchar(255) NOT NULL
);

ALTER TABLE FavoriteGames ADD FOREIGN KEY (game) REFERENCES Games(gid) ON DELETE CASCADE;  
ALTER TABLE FavoriteGames ADD FOREIGN KEY (userid) REFERENCES Users(uid) ON DELETE CASCADE;  
ALTER TABLE FavoriteGames ADD UNIQUE (game, userid);  


-- +goose Down
DROP TABLE FavoriteGames;
