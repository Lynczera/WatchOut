export interface OwnerEventResponse {
    events: OwnerEventEntity[];
  }
export type OwnerEventEntity = {
    Gametitle: string,
    Eventtitle: string,
    Description: string,
    Time: string,
    Eid: number,
    ParsedTime: string
}