import { View, RefreshControl, ScrollView, Keyboard } from "react-native";
import React from "react";
import { Game } from "@/types/game";
import GameCard from "@/pages/Search/Games/GameCard";
import { useQuery } from "@tanstack/react-query";
import { gameService } from "@/services/modules/game-entity";
import { StyleSheet } from "react-native";

interface SearchGameListProps {
  searchQuery: string;
  user : string
}
const SearchGameList = ({ searchQuery, user }: SearchGameListProps) => {
  const { data: games, isLoading, refetch } = useQuery<Game[]>({
    queryKey: ["games", searchQuery],
    queryFn: async () => {
      return await gameService.getByTitle(searchQuery, user, "America/Denver");
    },
    placeholderData: [],
  });

  return (
    <ScrollView style={styles.listContainer} onScroll={()=>{Keyboard.dismiss()}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      {games &&
        games.map((g) => (
          <View key={g.Gid}>
            <GameCard
            uid={user}
              name={g.Title}
              gameTime={g.Time? g.ParsedTime : "Game time not available"}
              gameType={g.Type}
              Gid={g.Gid}
              liked={g.IsFav}
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
export default SearchGameList;
