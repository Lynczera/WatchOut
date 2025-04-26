export interface FavoriteEventResponse {
    favorites: FavoriteEvent[];
}

export type FavoriteEvent = {
    Eid: number,
    Eventtitle: string,
    Eventdescription: string,
    Time: string,
    Game: number,
    Owner: string,
    Ownername: string,
    Gametitle:string,
    ParsedTime : string
}