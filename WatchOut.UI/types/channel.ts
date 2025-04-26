export interface ChannelsResponse {
    channels: Channel[];
  }

export type Channel = {
    Cid: number
    Name: string
}