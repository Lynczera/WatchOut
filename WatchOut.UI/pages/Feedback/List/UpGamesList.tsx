import { View, RefreshControl, ScrollView } from "react-native";
import React from "react";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { gameService } from "@/services/modules/game-entity";
import { StyleSheet } from "react-native";
import GameCard from "@/pages/Feedback/Card/GameCard";
import { GameLike } from "@/types/gamelike";
import { eventService } from "@/services/modules/event-entity";

interface UpGamesListProps {
  searchQuery: string;
  user : string
}
const UpGamesList = ({ searchQuery, user }: UpGamesListProps) => {

  const { data: games, isLoading, refetch } = useQuery<GameLike[]>({
    queryKey: ["games"],
    queryFn: async () => {
      const res = await eventService.getGameLike();
      return res
    },
    placeholderData: [],
  });

  return (
    <ScrollView style={styles.listContainer} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}>
      {games &&
        games.map((g) => (
          <View key={g.Gid}>
            <GameCard
            game={g}
              name={g.Title}
              gameTime={g.ParsedTime ?? "Game time not available"}
              logo={require("@/assets/images/ulogo.png")}
              Gid={g.Gid}
              numLikes={g.Count}
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
    height:"100%",
  },
});
export default UpGamesList;
