export interface TeamsResponse {
    teams: Team[];
  }

export type Team = {
    Name : string
    Time : string
    Tid: number
    IsFav: boolean
    ParsedTime : string
}