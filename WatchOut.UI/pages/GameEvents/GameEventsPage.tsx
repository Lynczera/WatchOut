import EventCard from "@/pages/GameEvents/Cards/EventCard";
import { api } from "@/services/api";
import { eventService } from "@/services/modules/event-entity";
import { GameEventById } from "@/services/modules/event-entity/types";
import { EventEntity, EventResponse } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface GameEventsPageProps {
  gid: string,
  user : string
}

function GameEventsPage({ gid,user }: GameEventsPageProps) {
  const { data: events } = useQuery<GameEventById[]>({
    queryKey: ["gamesEvents", gid],
    queryFn: async () => {
      return await eventService.getByGameId(gid, user)
    },
  });

  return (
    <View style = {styles.listContainer}>
      <Text style ={{marginBottom : 16, fontSize : 32}}>Events for current Game</Text>
      {events? events.map((e)=> (
        <TouchableOpacity key={e.Eid}>
        <EventCard user={user} event={e}  logo={require("@/assets/images/ulogo.png")}/>
        </TouchableOpacity>
      )) : <Text>No Events Available for this Game</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer : {
    marginTop : 32,
    padding : 16,
  }
})

export default GameEventsPage;
