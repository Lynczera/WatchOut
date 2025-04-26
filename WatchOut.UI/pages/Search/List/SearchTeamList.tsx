import { Keyboard, ScrollView, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/services/modules/team-entity";
import { Team } from "@/types/team";
import TeamCard from "@/pages/Search/Teams/TeamCard";

import { StyleSheet } from "react-native";

interface SearchTeamListProps {
  searchQuery: string;
  user: string;
}
const SearchTeamList = ({ searchQuery, user }: SearchTeamListProps) => {
  const { data: teams , isLoading} = useQuery<Team[]>({
    queryKey: ["teams", searchQuery],
    placeholderData : [],
    queryFn: async () => {
      let res = await teamService.getByName(searchQuery, user);
      return res
    },
  });

  return  isLoading? <View style={{backgroundColor : 'red'}}></View>:(
    <ScrollView style={styles.listContainer} onScroll={()=>{Keyboard.dismiss()}}>
      {teams &&
        teams.map((t) => (
          <View key={t.Name}>
            <TeamCard
            user={user}
              logo={require("@/assets/images/ulogo.png")}
              team={t}
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
export default SearchTeamList;
