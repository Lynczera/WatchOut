export interface TransmissionResponse {
    transmissions: Transmission[];
  }
export type Transmission = {
    Tid : number
    Description: string
    Owner : number
    Channel : number
    Channelname : string
}