export type CreateEventPayload = {
    eventTitle : string,
    eventDescription : string,
    eventTime : string,
    gameid : number,
    ownerid : string
  }

  export type GameEventByIdResponse={
    events : GameEventById[]
  }

  export type GameEventById={
    Eid: number,
    Title: string,
    Description: string,
    Time: string,
    Game: number,
    Owner: string,
    Ownername:string,
    Gametitle: string,
    ParsedTime: string,
    IsFav: boolean,
    Fid: number
  }