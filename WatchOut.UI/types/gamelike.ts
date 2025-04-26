export interface GameLikeResponse {
    games: GameLike[];
  }

export type GameLike = {
    Game: number,
    Count: number,
    ID: number,
    Time: string,
    Type: string,
    Title: string,
    Team1: number,
    Team2: number,
    Gid: number,
    ParsedTime: string
}

export type LikeCount={
    count : number
}