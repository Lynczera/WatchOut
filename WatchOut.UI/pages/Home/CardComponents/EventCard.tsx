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
import EventModal from "@/pages/Home/ModalComponents/EventModal";
import { eventService } from "@/services/modules/event-entity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteEvent } from "@/types/favoriteEvent";

interface EventCardProps {
  logo: ImageSourcePropType;
  user: string;
  event: FavoriteEvent;
}

const EventCard = ({ logo, event, user }: EventCardProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);
  const queryClient = useQueryClient();
  const [isliked, setLiked] = useState<boolean>(true);


  const toggleLike = async () => {
    if (!isliked) {
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Text style={styles.eventName}>{event.Ownername}</Text>

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
                  color={isliked ? "red" : "transparent"}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.eventName}>{event.Gametitle}</Text>
            <Text style={styles.gameTime}>{event.ParsedTime}</Text>
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
    marginBottom: 5,
    maxWidth: 250,
  },
  titleGap: {
    justifyContent: "space-around",
    padding: 8,
  },
  teamName: {
    fontSize: 14,
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
});

export default EventCard;
