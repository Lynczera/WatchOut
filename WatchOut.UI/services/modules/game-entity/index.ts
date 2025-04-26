import { api } from "@/services/api";
import { FavoriteGame, FavoriteGameResponse } from "@/types/favoriteGame";
import { Game, GamesResponse } from "@/types/game";

class GameService {
  async getFavorites(userID: string): Promise<FavoriteGame[]> {
    const response = await api.get<FavoriteGameResponse>("user/favorite", {
      params: { userID: userID, type: 'games' },
    });
    return response.data.favorites;
  }

  async favorite(uid: string, gid : number) {
    await api.post("user/favorite", {
      userID: uid,
      id: gid,
      type: 'game'
    });
  }

  async unfavorite(uid: string, gid : number) {
    await api.delete("user/unfavorite", {
      params: { userID: uid, type: 'game', id: gid},
    });
  }

  async getByTitle(title: string, user: string, utc: string): Promise<Game[]> {
    const response = await api.get<GamesResponse>("tv/games", {
      params: { title: title, uid : user, utc:utc },
    });
    return response.data.games;
  }
}

export const gameService = new GameService();
