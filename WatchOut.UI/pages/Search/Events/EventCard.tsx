import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "@/pages/Search/Events/Modals/EventModal";
import { eventService } from "@/services/modules/event-entity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EventEntity } from "@/types/event";

interface EventCardProps {
  logo: ImageSourcePropType;
  user: string;
  event: EventEntity;
}

const EventCard = ({ logo, user, event }: EventCardProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);
  const queryClient = useQueryClient();


  const toggleLike = async () => {
    if (!event.IsFav) {
      try {
        await eventService.favorite(user, event.Eid);
      } catch (e) {
        alert("Couldn't like event");
        console.log(e);
      }
    } else {
      try {
        await eventService.unfavorite(user, event.Eid);
      } catch (e) {
        alert("Couldn't unlike event");
      }
    }
    queryClient.invalidateQueries(["favorite"]);
    queryClient.invalidateQueries(["events"]);
  };

  const onclose = () => {
    setCreateEventModalVisible(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setCreateEventModalVisible(true);
      }}
    >
      <View style={styles.cardLayout}>
        <EventModal
          event={event}
          logo={logo}
          visible={createEventModalVisible}
          onClose={onclose}
        />
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.eventName}>{event.Ownername}</Text>
            <View style={styles.titleIconLayout}>
              <Text style={styles.eventName}>{event.Gametitle}</Text>
              <TouchableOpacity onPress={toggleLike}>
                <Icon
                  name="heart-o"
                  size={20}
                  color="black"
                  style={styles.heartBorder}
                />
                <Icon
                  name="heart"
                  size={20}
                  color={event.IsFav ? "red" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    gap: 10,
    margin: 5,
    maxWidth: 240,
  },
  titleGap: {
    justifyContent: "space-around",
  },
  description: {
    fontSize: 14,
    paddingLeft: 7,
    width: "60%",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gameTime: {
    fontSize: 14,
    color: "gray",
  },
  heartBorder: {
    position: "absolute",
  },
  cardLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  imageLayout: {
    width: 55,
    height: 55,
  },
  titleIconLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});

export default EventCard;
