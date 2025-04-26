import {
    View,
    Text,
    ScrollView,
    StyleSheet,
  } from "react-native";
  import EventCard from "@/pages/Search/Bars/Cards/EventCard";
  import { useQuery } from "@tanstack/react-query";
  import { Transmission } from "@/types/transmission";
  import TransmissionCard from "@/pages/Search/Bars/Cards/TransmissionCard";
  import { eventService } from "@/services/modules/event-entity";
  import { transmissionService } from "@/services/modules/transmission-entity";
import { OwnerEventEntity } from "@/types/ownerEvent";
  
  interface EventListProps {
    filter: string;
    ownerId: string;
  }
  const EventList = ({filter, ownerId }: EventListProps) => {
    const {
      data: events,
      isLoading,
      isError,
    } = useQuery<OwnerEventEntity[]>({
      queryKey: ["events", ownerId],
      queryFn: async () => {
        return eventService.getByOwner(ownerId)
      },
      placeholderData: [],
    });
  
    const { data: transmissions } = useQuery<Transmission[]>({
      queryKey: ["transmissions", ownerId],
      queryFn: async () => {
        return transmissionService.getByOwner(ownerId)
      },
      placeholderData: [],
    });
  
    return (
      <View style={styles.listContainer}>
        {!events && filter === "events" && (
          <Text style={styles.emptyEventText}>
            No events available
          </Text>
        )}
        {!transmissions && filter === "transmission" && (
          <Text style={styles.emptyEventText}>
            No transmissions available
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
                  gameTime={e.ParsedTime}
                  Eid={e.Eid}
                  logo={require("@/assets/images/ulogo.png")}
                  game={e.Gametitle}
                />
              </View>
            ))}
          {transmissions &&
            filter == "transmission" &&
            transmissions.map((t) => (
              <View key={t.Tid}>
                <TransmissionCard
                  cid={t.Channel}
                  Tid={t.Tid}
                  channelName={t.Channelname}
                  description={t.Description}
                  logo={require("@/assets/images/ulogo.png")}
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
  