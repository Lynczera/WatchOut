export interface FavoriteBarResponse {
    favorites: FavoriteBar[];
}

export type FavoriteBar = {
    Ownername : string
    Fid: number
    Oid : string
}