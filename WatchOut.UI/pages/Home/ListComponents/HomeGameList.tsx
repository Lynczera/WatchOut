import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Game, GamesResponse } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { ScrollView } from "react-native";
import { FavoriteGame, FavoriteGameResponse } from "@/types/favoriteGame";
import GameCard from "../CardComponents/GameCard";
import { gameService } from "@/services/modules/game-entity";

interface HomeGameListProps {
  user: string;
}

const HomeGameList = ({ user }: HomeGameListProps) => {
  const { data: games } = useQuery<FavoriteGame[]>({
    queryKey: ["favorite", "games"],
    queryFn: async () => {
      return await gameService.getFavorites(user);
    },
    placeholderData: [],
  });
  return (
    <View>
      <ScrollView style={styles.listContainer}>
        {games &&
          games.map((g) => (
            <View key={g.Gid}>
              <GameCard
                user={user}
                logo={require("../../../assets/images/ulogo.png")}
                favGame={g}
              />
            </View>
          ))}
        {!games && <Text style={styles.noGameTitle}>No Games Liked</Text>}
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

export default HomeGameList;
