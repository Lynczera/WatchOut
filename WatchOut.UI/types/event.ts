export interface EventResponse {
    events: EventEntity[];
  }
export type EventEntity = {
    Eid : number
    Eventtitle : string
    Eventdescription: string
    Time: string
    Game : number
    Owner: string
    Gametitle: string
    IsFav: boolean
    ParsedTime : string
    Ownername : string
}

// export type EventEntity = {
//   Eid : number
//   title : string
//   description: string
//   Time: string
//   Game : number
//   Owner: string
//   Gametitle: string
//   IsFav: boolean
//   ParsedTime : string
//   Ownername : string
// }