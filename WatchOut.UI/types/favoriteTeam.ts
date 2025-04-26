export interface FavoriteTeamResponse {
    favorites: FavoriteTeam[];
}

export type FavoriteTeam = {
    Teamtitle : string
    Fid: number
    Tid : number
}