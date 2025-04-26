import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { FavoriteEvent } from "@/types/favoriteEvent";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/modules/event-entity";
import EventCard from "../CardComponents/EventCard";
interface HomeEventListProps {
  user: string;
}

const HomeEventList = ({ user }: HomeEventListProps) => {
  const { data: events } = useQuery<FavoriteEvent[]>({
    queryKey: ["favorite"],
    queryFn: async () => {
      return await eventService.getFavorites(user);
    },
    placeholderData: [],
  });
  return (
    <View>
      <ScrollView style={styles.listContainer}>
        {events &&
          events.map((e) => (
            <View key={e.Eid}>
              <EventCard
                user={user}
                logo={require("@/assets/images/ulogo.png")}
                event={e}
              />
            </View>
          ))}
        {!events && <Text style={styles.noGameTitle}>No Events Liked</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    paddingInline: 8,
    height: "100%",
  },
  noGameTitle: {
    fontSize: 24,
    marginInline: 16,
  },
});
export default HomeEventList;
