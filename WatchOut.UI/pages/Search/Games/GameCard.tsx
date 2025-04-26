import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GameInfoModal from "@/components/modals/GameInfoModal";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { gameService } from "@/services/modules/game-entity";

interface GameCardProps {
  name: string;
  gameTime: string;
  gameType: string;
  Gid: number;
  liked: boolean;
  uid : string
}

const GameCard = ({ name, gameTime, gameType, Gid, liked , uid}: GameCardProps) => {
  
  const getLogo = (gameType: string) => {
  switch (gameType) {
    case "Sports, Basketball":
      return require("@/assets/images/basketball.png");
    case "Sports, Football":
      return require("@/assets/images/football.png");
    case "Sports, Baseball":
      return require("@/assets/images/baseball.png");
    case "Sports, Softball":
      return require("@/assets/images/softball.png");
    case "Sports, Soccer":
      return require("@/assets/images/soccer.png");
    case "Sports, Lacrosse":
      return require("@/assets/images/lacrosse.png");
    case "Sports, Hockey":
      return require("@/assets/images/hockey.png");
    default:
      return require("@/assets/images/ulogo.png");
    }
  };

  const logo = getLogo(gameType);
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);
  const queryClient = useQueryClient();

  const toggleLike = async () => {
    if (!liked) {
      try {
        await gameService.favorite(uid, Gid);
      } catch (e) {
        alert("Couldn't like game");
        console.log(e);
      }
    } else {
      try {
          await gameService.unfavorite(uid, Gid);
      } catch (e) {
        alert("Couldn't unlike game");
      }
    }
    queryClient.invalidateQueries(["favorite"]);
    queryClient.invalidateQueries(["games"]);
  };
  const onclose = () => {
    setCreateEventModalVisible(false);
  };

  return (
    <Pressable onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        <GameInfoModal
          visible={createEventModalVisible}
          onClose={onclose}
          logo={logo}
          title={name}
          gameTime={gameTime}
          Gid={Gid}
        />
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{name}</Text>
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
                color={liked ? "red" : "transparent"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.gameTime}>{gameTime}</Text>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode="contain" />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    maxWidth: 250,
  },
  titleGap: {
    justifyContent: "space-around",
    paddingBlock : 10
  },
  teamName: {
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    height: 75,
    width: "100%",
    backgroundColor: "white",

    alignItems: "center",
  },
  imageLayout: {
    width: 55,
    height: 55,
  },
});

export default GameCard;
