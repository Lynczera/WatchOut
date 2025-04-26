import { api } from "@/services/api";
import { Channel, ChannelsResponse } from "@/types/channel";
import { Transmission, TransmissionResponse } from "@/types/transmission";
import { Schedule, ScheduleResponse } from "./types";

class  ChannelService {
    async getByName(name : string):Promise<Channel[]>{
        const response = await api.get<ChannelsResponse>(
            'tv/channelsByString', {params: { name : name}}
          );
          return response.data.channels;
}

async getScheduleByChannel(channel : number):Promise<Schedule | null>{
    const currentTimeUtc = new Date().toISOString();// e.g., "2025-04-08T14:30:00.000Z"
    const san_time = currentTimeUtc.replace("T", " ").split(".")[0]
    
    const response = await api.get<ScheduleResponse>(
        'tv/scheduleByChannel', {params: { channel : channel, time : san_time}}
      );
      if (response.data.schedule.Channel === 0){
        return null
      }
      return response.data.schedule;
}

}

export const channelService = new ChannelService()