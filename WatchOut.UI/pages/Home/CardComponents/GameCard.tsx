import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GameInfoModal from "../../../components/modals/GameInfoModal";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Pressable } from "react-native";
import { gameService } from "@/services/modules/game-entity";
import { FavoriteGame } from "@/types/favoriteGame";

interface GameCardProps {
  user : string
  favGame : FavoriteGame
}

const GameCard = ({  user ,favGame }: GameCardProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);

    const [liked, setLiked] = useState(true)
  const queryClient = useQueryClient();

  const toggleLike = async () => {
    if (!liked) {
      try {
        await gameService.favorite(user, favGame.Gid);
      } catch (e) {
        alert("Couldn't like game");
      }
    } else {
      try {
        await gameService.unfavorite(user, favGame.Gid);
      } catch (e) {
        alert("Couldn't unlike game");
      }
    }
    // queryClient.invalidateQueries(["favorite","games"]);
    queryClient.invalidateQueries(["favorite"]);
    queryClient.invalidateQueries(["games"]);

    // queryClient.invalidateQueries({
    //   queryKey: ["games"],
    // });
  };

  const onclose = () => {
    setCreateEventModalVisible(false);
  };
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
  const logo = getLogo(favGame.Type);


  return (
    <TouchableOpacity onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        <GameInfoModal
          visible={createEventModalVisible}
          onClose={onclose}
          logo={logo}
          title={favGame.Gametitle}
          gameTime={favGame.ParsedTime}
          Gid={favGame.Gid}
        />
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{favGame.Title}</Text>
            <Pressable onPress={toggleLike}>
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
            </Pressable>
          </View>
          <Text style={styles.gameTime}>{favGame.ParsedTime}</Text>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode="contain" />
      </View>
    </TouchableOpacity>
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
