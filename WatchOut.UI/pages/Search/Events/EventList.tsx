import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import EventCard from "./EventCard";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Transmission, TransmissionResponse } from "@/types/transmission";
import TransmissionCard from "@/pages/Profile/OwnerComponents/Cards/TransmissionCard";
import { EventEntity, EventResponse } from "@/types/event";
import { eventService } from "@/services/modules/event-entity";
import { transmissionService } from "@/services/modules/transmission-entity";

interface EventListProps {
  owner: string;
  filter: string;
  ownerId: number;
}
const EventList = ({ owner, filter, ownerId }: EventListProps) => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery<EventEntity[]>({
    queryKey: ["events", "profileEvents", owner],
    queryFn: async () => {
      return eventService.getByOwner(owner);
    },
    placeholderData: [],
  });

  const { data: transmissions } = useQuery<Transmission[]>({
    queryKey: ["transmissions", "profileTransmissions", owner],
    queryFn: async () => {
      return transmissionService.getByOwner(1);
    },
    placeholderData: [],
  });

  return (
    <View style={styles.listContainer}>
      {!events && filter === "events" && (
        <Text style={styles.emptyEventText}>
          Click create event to make a new event
        </Text>
      )}
      {!transmissions && filter === "transmission" && (
        <Text style={styles.emptyEventText}>
          Click start stream to start a new transmission
        </Text>
      )}
      {filter == "events" && events && (
        <Text style={styles.eventText}>Your Events</Text>
      )}
      {filter == "transmission" && transmissions && (
        <Text style={styles.eventText}>Your Transmissions</Text>
      )}

      <ScrollView>
        {events &&
          filter == "events" &&
          events.map((e) => (
            <View key={e.Eid}>
              <EventCard
                name={e.Eventtitle}
                description={e.Description}
                gameTime={e.Time}
                Eid={e.Eid}
                logo={require("../../../assets/images/ulogo.png")}
                game={e.Gametitle}
              />
            </View>
          ))}
        {transmissions &&
          filter == "transmission" &&
          transmissions.map((t) => (
            <View key={t.Tid}>
              <TransmissionCard
                Tid={t.Tid}
                channelName={t.Channelname}
                description={t.Description}
                logo={require("../../../assets/images/ulogo.png")}
                Oid={t.Owner}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    marginInline: 8,
    height: "100%",
  },
  eventText: {
    marginBottom: 8,
  },
  emptyEventText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 150,
  },
});

export default EventList;
