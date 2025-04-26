import { api } from "@/services/api";
import { FavoriteTeam, FavoriteTeamResponse } from "@/types/favoriteTeam";
import { Team, TeamsResponse } from "@/types/team";

class TeamService {

  async getFavorites(userID: string): Promise<FavoriteTeam[]> {
      const response = await api.get<FavoriteTeamResponse>("user/favorite", {
        params: { userID: userID, type: 'teams' },
      });
      return response.data.favorites;
    }

    async getByName(teamName : string, user: string):Promise<Team[]>{
      const response = await api.get<TeamsResponse>(
        'tv/teams', {params : {name : teamName, uid: user}}
      );
      return response.data.teams;
}

async favorite(userID: string, tid : number) {
  await api.post("user/favorite", {
    userID: userID,
    id: tid,
    type: 'team'
  });
}

async unfavorite(uid: string, tid : number) {
  await api.delete("user/unfavorite", {
    params: { userID: uid, type: 'team', id: tid},
  });
}

}

export const teamService = new TeamService()