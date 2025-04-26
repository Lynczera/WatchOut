export interface GamesResponse {
    games: Game[];
  }

export type Game = {
    Gid: number
    Team1: string
    Team2: string
    Type: string
    Time: string
    Title: string
    IsFav: boolean
    ParsedTime : string
}