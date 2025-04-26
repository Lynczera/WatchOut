import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EventEntity } from "@/types/event";
import { eventService } from "@/services/modules/event-entity";
import EventCard from "@/pages/Search/Events/EventCard";


interface SearchEventListProps {
  searchQuery: string;
  user: string;
}
const SearchEventList = ({ searchQuery, user }: SearchEventListProps) => {
  
  const { data: events } = useQuery<EventEntity[]>({
    queryKey: ["events", searchQuery],
    queryFn: async () => {
      return eventService.getByTitle(searchQuery, user);
    },
  });
 
  return (
    <ScrollView style={styles.listContainer} onScroll={()=>{Keyboard.dismiss()}}>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  // list search results
  listContainer: {
    display: "flex",
  },
});
export default SearchEventList;
