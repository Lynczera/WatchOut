export interface FavoriteGameResponse {
    favorites: FavoriteGame[];
}

export type FavoriteGame = {
    Gametitle : string
    Gametime : string
    Fid : number
    Gid : number
    Title: string
    Type: string,
    ParsedTime: string
}
