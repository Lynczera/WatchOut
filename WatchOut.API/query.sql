-- name: CreateTeam :one
INSERT INTO teams (
	name,tid
) VALUES (
	$1, $2
) RETURNING *;

-- name: CreateChannel :one 
INSERT INTO channels (
	name,cid
) VALUES (
	$1, $2
) RETURNING *;

-- name: CreateGame :one
INSERT INTO games (
	time, 
	type,
	title,
	team1,
	team2,
	gid
) VALUES (
	$1,$2,$3,$4,$5,$6
) RETURNING *;

-- name: CreateSchedule :one
INSERT INTO schedules(
	game,
	channel,
	starttime,
	endtime
) VALUES (
	$1, $2, $3, $4
) RETURNING *;

-- name: FindTeam :one
SELECT * FROM teams 
WHERE name = $1;

-- name: FindTeamPrefix :many
SELECT DISTINCT ON (name)
    name, time,tid,
CASE
	WHEN fav.fid IS NULL THEN FALSE
	ELSE TRUE
	END AS is_fav
FROM (
    SELECT teams.name, games.time, teams.tid FROM teams 
    LEFT JOIN games ON teams.tid = games.team1 OR teams.tid = games.team2
    WHERE teams.name ILIKE '%' || $1 || '%'
) AS recent_games LEFT JOIN favoriteteams AS fav ON fav.userid=$2 AND fav.team = recent_games.tid
ORDER BY name, time DESC;

-- name: FindGamePrefix :many
SELECT DISTINCT on (gid) t1.name AS team1, t2.name AS team2, type, time, title, gid, type,
CASE
	WHEN fid IS NULL THEN FALSE
	ELSE TRUE
	END AS is_fav
FROM games
JOIN teams AS t1 on t1.tid=games.team1 or t1.tid=games.team2
JOIN teams AS t2 on (t2.tid=games.team1 or t2.tid=games.team2) AND t1.tid != t2.tid
LEFT JOIN favoritegames AS fav on (fav.userid=$2) AND (fav.game = gid)
WHERE title ilike '%' || $1 || '%';

-- name: FindOwnerPrefix :many
SELECT *,
CASE
	WHEN fav.fid IS NULL THEN FALSE
	ELSE TRUE
	END AS is_fav
FROM owners as o
LEFT JOIN favoriteowners AS fav ON fav.userid=$2 AND fav.ownerid = o.oid
WHERE o.name ilike '%' || $1 || '%';

-- name: FindOwnerById :one
SELECT * FROM owners
WHERE oid = $1;

-- name: FindUserById :one
SELECT * FROM users
WHERE uid = $1;

-- name: FindEventPrefix :many
SELECT e.eid, e.title as eventtitle, e.description as eventdescription, e.time, e.game, e.owner, games.title as gametitle, o.name as ownername,
CASE
	WHEN fav.fid IS NULL THEN FALSE
	ELSE TRUE
	END AS is_fav
FROM events as e
JOIN owners as o ON e.owner = o.oid
JOIN games ON e.game = games.gid
LEFT JOIN favoriteevents AS fav ON fav.userid=$2 AND fav.event = e.eid
WHERE e.title ilike '%' || $1 || '%';

-- name: CreateEvent :one
INSERT INTO events (
	title,
	description,
	time,
	game,
	owner
) VALUES (
	$1, $2 ,$3 ,$4 ,$5
) RETURNING *;

-- name: DeleteEventById :exec
DELETE FROM events 
WHERE eid = $1;

-- name: CreateTransmission :one
INSERT INTO transmissions (
	channel,
	owner,
	description
) VALUES (
	$1, $2, $3
) RETURNING *;

-- name: DeleteTransmission :exec
DELETE FROM transmissions 
WHERE tid = $1;

-- name: FindFavoriteGame :many
SELECT g.title as gametitle, g.time as gametime, f.fid, g.gid, g.title, g.type FROM favoritegames as f
JOIN games as g
ON f.game = g.gid
WHERE userid = $1;

-- name: FindGameLikeCount :many
SELECT * FROM (SELECT game, COUNT(game) FROM favoritegames
GROUP BY game ) as favCnt JOIN games as g ON favCnt.game=g.gid 
WHERE title ilike '%' || $1 || '%';

-- name: CreateFavoriteGame :one
INSERT INTO favoritegames (
	game, 
	userid
) VALUES (
	$1, $2
) RETURNING *;

-- name: DeleteFavoriteGame :exec
DELETE FROM favoritegames
WHERE game = $1 AND userid = $2;

-- name: FindFavoriteTeam :many
SELECT t.name as teamtitle, f.fid, t.tid FROM favoriteteams as f
JOIN teams as t
ON f.team = t.tid
WHERE userid = $1;

-- name: CreateFavoriteTeam :one
INSERT INTO favoriteteams (
	team, 
	userid
) VALUES (
	$1, $2
) RETURNING *;

-- name: DeleteFavoriteTeam :exec
DELETE FROM favoriteteams
WHERE team = $1 AND userid = $2;

-- name: FindFavoriteOwner :many
SELECT o.name as ownername, f.fid, o.oid FROM favoriteowners as f
JOIN owners as o
ON f.ownerid = o.oid
WHERE userid = $1;

-- name: CreateFavoriteOwner :one
INSERT INTO favoriteowners (
	ownerid, 
	userid
) VALUES (
	$1, $2
) RETURNING *;

-- name: DeleteFavoriteOwner :exec
DELETE FROM favoriteowners
WHERE ownerid = $1 AND userid = $2;

-- name: FindFavoriteEvent :many
SELECT 
  e.eid, 
  e.title AS eventtitle, 
  e.description AS eventdescription, 
  e.time, 
  e.game, 
  e.owner, 
  o.name as ownername,
  g.title as gametitle
FROM favoriteevents AS f
JOIN events AS e ON f.event = e.eid
JOIN owners AS o ON e.owner = o.oid 
JOIN games as g on e.game = g.gid
WHERE f.userid = $1;

-- name: CreateFavoriteEvent :one
INSERT INTO favoriteevents (
	event, 
	userid
) VALUES (
	$1, $2
) RETURNING *;

-- name: DeleteFavoriteEvent :exec
DELETE FROM favoriteevents
WHERE event = $1 AND userid = $2;


-- name: FindTransmissionsByOwner :many
SELECT t.tid, t.owner, t.channel, t.description, c.name as channelname FROM transmissions as t
JOIN channels as c 
ON t.channel = c.cid
WHERE owner = $1;

-- name: FindChannelByName :one
SELECT * FROM channels
WHERE name = $1;

-- name: FindChannelByString :many
SELECT * FROM channels
WHERE name ilike '%' || $1 || '%';

-- name: FindEventByGameTitle :many
SELECT e.title, e.description, e.time FROM events as e 
JOIN games AS g
ON game = g.gid
WHERE g.title = $1;

-- name: FindEventByGameId :many
SELECT eid,title,description, time, game, owner, ownername, gametitle,
CASE
	WHEN fe.fid IS NULL THEN FALSE
	ELSE TRUE
	END AS is_fav,
CASE
	WHEN fid IS NULL THEN -1
	ELSE fid
	END AS fid
FROM (SELECT e.eid, e.title, e.description, e.time, e.game, e.owner, o.name as ownername, g.title as gametitle
FROM events as e
JOIN owners as o
ON e.owner = o.oid
JOIN games as g
ON e.game = g.gid
WHERE e.game =$1) as events 
LEFT JOIN (SELECT fid, event,userid from favoriteevents WHERE userid=$2 ) as fe on eid = fe.event;

-- name: GetEventLikeCount :one
SELECT Count(*) FROM favoriteevents where event=$1;

-- name: CreateOwner :one
INSERT INTO owners (
	name,
	zip,
	address,
	city,
	state,
	country,
	lat,
	long,
	hours, 
	oid
) VALUES (
	$1, $2, $3, $4, $5, $6, $7, $8, $9, $10
) RETURNING *;

-- name: CreateCustomer :one
INSERT INTO users (
	name, 
	zip, 
	uid
) VALUES (
	$1, $2, $3
) RETURNING *;

-- name: FindEventsByOwner :many
SELECT g.title as gameTitle, e.title as eventTitle, e.description, e.time, e.eid
FROM events as e JOIN owners as o ON e.owner=o.oid
JOIN games as g on g.gid=e.game
WHERE o.oid = $1;

-- name: FindOwnerByName :one
SELECT * FROM owners
WHERE name = $1;

-- name: FindGameByTitle :one
SELECT * FROM games
WHERE title = $1;

-- name: FindEventByTitle :many
SELECT e.eid, e.title, e.description, e.time, e.game, e.owner, o.name as ownername, g.title as gametitle FROM events as e
JOIN owners as o
ON e.owner=o.oid
JOIN games as g
ON e.game = g.gid
WHERE e.title ilike '%' || $1 || '%';

-- name: FindBarByName :many
SELECT * FROM owners
WHERE name ilike '%' || $1 || '%';

-- name: GetScheduleByChannel :many
SELECT * FROM (SELECT * FROM schedules 
WHERE channel=$1 
AND $2 BETWEEN starttime AND endtime)
AS s JOIN games ON s.game = gid;

-- name: DeleteAllGames :exec
TRUNCATE TABLE games RESTART IDENTITY CASCADE;

-- name: DeleteAllChannels :exec
TRUNCATE TABLE channels RESTART IDENTITY CASCADE;

-- name: DeleteAllUsers :exec
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- name: DeleteAllOwners :exec
TRUNCATE TABLE owners RESTART IDENTITY CASCADE;

-- name: DeleteAllTeams :exec
TRUNCATE TABLE teams RESTART IDENTITY CASCADE;

-- name: DeleteAllEvents :exec
TRUNCATE TABLE events RESTART IDENTITY CASCADE;

-- name: DeleteAllFavorites :exec
TRUNCATE TABLE favoritegames RESTART IDENTITY CASCADE;
TRUNCATE TABLE favoriteevents RESTART IDENTITY CASCADE;
TRUNCATE TABLE favoriteteams RESTART IDENTITY CASCADE;
TRUNCATE TABLE favoriteowners RESTART IDENTITY CASCADE;

-- name: DeleteAllTransmissions :exec
TRUNCATE TABLE transmissions RESTART IDENTITY CASCADE;
