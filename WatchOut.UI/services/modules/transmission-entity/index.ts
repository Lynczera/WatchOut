import { api } from "@/services/api";
import { Transmission, TransmissionResponse } from "@/types/transmission";
import { CreateTransmissionPayload } from "./types";

class TransmissionService {
    async getByOwner(ownerId : string):Promise<Transmission[]>{
      const response = await api.get<TransmissionResponse>(
        "event/transmissionsByOwner",
        { params: { ownerID: ownerId } }
      );
      return response.data.transmissions;
}

async stopById(tid : number){
    const response = await api.delete(
        "event/stopTransmission", { params: { tID: tid } }
    )
}

async start(createTransmissionPayload : CreateTransmissionPayload){
  await api.post<Transmission>("event/startTransmission", createTransmissionPayload);
}

}

export const transmissionService = new TransmissionService()