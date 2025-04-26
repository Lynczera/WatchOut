import { api } from "@/services/api";
import {
  CreateEventPayload,
  GameEventById,
  GameEventByIdResponse,
} from "./types";
import { EventEntity, EventResponse } from "@/types/event";
import { FavoriteEvent, FavoriteEventResponse } from "@/types/favoriteEvent";
import { OwnerEventEntity, OwnerEventResponse } from "@/types/ownerEvent";
import { GameLike, GameLikeResponse, LikeCount } from "@/types/gamelike";

class EventService {
  async create(createGamePayload: CreateEventPayload): Promise<EventEntity> {
    const response = await api.post<EventEntity>(
      "event/event",
      createGamePayload
    );
    return response.data;
  }

  async getFavorites(userID: string): Promise<FavoriteEvent[]> {
    const response = await api.get<FavoriteEventResponse>("user/favorite", {
      params: { userID: userID, type: "events" },
    });
    return response.data.favorites;
  }

  async getGameLike(): Promise<GameLike[]> {
    const response = await api.get<GameLikeResponse>("user/gamelikecount", {
      params: {title : "", utc : "America/Denver" },
    });
    return response.data.games;
  }

  async getEventLikeCount(eid: number): Promise<number> {
    const response = await api.get<LikeCount>("event/eventLikeCount", {
      params: { eid: eid },
    });
    return response.data.count;
  }

  async getByOwner(owner: string): Promise<OwnerEventEntity[]> {
    const response = await api.get<OwnerEventResponse>("event/eventsByOwner", {
      params: { ownerid: owner, utc: "America/Denver" },
    });
    return response.data.events;
  }

  async getByTitle(title: string, user: string): Promise<EventEntity[]> {
    const response = await api.get<EventResponse>("tv/events", {
      params: { title: title, uid: user },
    });

    return response.data.events;
  }

  async getByGameId(gid: string, uid: string): Promise<GameEventById[]> {
    const response = await api.get<GameEventByIdResponse>(
      "event/eventsByGameId",
      { params: { gameId: gid, uid: uid, utc: "America/Denver" } }
    );
    return response.data.events;
  }

  async deleteById(Eid: number) {
    await api.delete("event/deleteEventById", { params: { eid: Eid } });
  }
  async getByType(filterType: string, user: string): Promise<EventEntity[]> {
    const response = await api.get<EventResponse>("event/getEventsByType", {
      params: { type: filterType, userId: user },
    });
    return response.data.events;
  }

  async favorite(userID: string, eid: number) {
    await api.post("user/favorite", {
      userID: userID,
      id: eid,
      type: "event",
    });
  }

  async unfavorite(uid: string, eid: number) {
    await api.delete("user/unfavorite", {
      params: { userID: uid, type: "event", id: eid },
    });
  }
}

export const eventService = new EventService();
