import { api } from "@/services/api";
import { Bar, BarResponse, SingleBarResponse } from "@/types/bar";
import { FavoriteBar, FavoriteBarResponse } from "@/types/favoriteBar";
import { Team, TeamsResponse } from "@/types/team";

class BarService {

    async getFavorites(userID: string): Promise<FavoriteBar[]> {
          const response = await api.get<FavoriteBarResponse>("user/favorite", {
            params: { userID: userID, type: 'owners' },
          });
          return response.data.favorites;
        }

    async getByName(barName : string, user: string):Promise<Bar[]>{
        const response = await api.get<BarResponse>("tv/owners", {
            params: { name: barName, uid: user },
          });
          return response.data.owners;
    }

    async getById(oid: string):Promise<Bar>{
      const response = await api.get<SingleBarResponse>("tv/ownerById", {
          params: {oid: oid },
        });
        return response.data.owner;
  }

    async favorite(uid: string, oid : string) {
        await api.post("user/favorite", {
          userID: uid,
          id: oid,
          type: 'owner'
        });
      }

      async unfavorite(uid: string, oid : string) {
        await api.delete("user/unfavorite", {
          params: { userID: uid, type: 'owner', id: oid },
        });
      }

}

export const barService = new BarService()