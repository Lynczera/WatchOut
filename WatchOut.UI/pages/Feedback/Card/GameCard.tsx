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
import CreateEventModal from "../Modal/CreateEventModal";
import { Game } from "@/types/game";
import { GameLike } from "@/types/gamelike";
import { useAuth } from "@/context/AuthContext";

interface GameCardProps {
  name: string;
  gameTime: string;
  logo: any;
  Gid: number;
  numLikes: number;
  game: GameLike;
}

const GameCard = ({
  name,
  gameTime,
  logo,
  Gid,
  numLikes,
  game,
}: GameCardProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const onclose = () => {
    setCreateEventModalVisible(false);
  };

  return (
    // <Pressable onPress={() => setCreateEventModalVisible(true)}>
    <Pressable onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        {/* <GameInfoModal
          visible={createEventModalVisible}
          onClose={onclose}
          logo={logo}
          title={name}
          gameTime={gameTime}
          Gid={Gid}
        /> */}
        <CreateEventModal
          game={game}
          onClose={onclose}
          user={user.$id}
          visible={createEventModalVisible}
        />
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{name}</Text>
          </View>
          {numLikes === 1 ? (
            <Text style={{color : 'red'}}> {numLikes} total like</Text>
          ) : (
            <Text> {numLikes} likes</Text>
          )}

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
    height: 95,
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
