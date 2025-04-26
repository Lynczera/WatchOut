import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/services/modules/team-entity";
import { FavoriteTeam } from "@/types/favoriteTeam";
import TeamCard from "../CardComponents/TeamCard";
interface HomeTeamListProps {
  user: string;
}

const HomeTeamList = ({user}:HomeTeamListProps) => {
  const { data: teams } = useQuery<FavoriteTeam[]>({
    queryKey: ["favorite", "teams"],
    queryFn: async () => {
      return await teamService.getFavorites(user)
    },
    placeholderData: [],
  });
  return (
    <View>
      <ScrollView style={styles.listContainer}>
        {teams &&
          teams.map((t) => (
            <View key={t.Tid}>
              <TeamCard
              user={user}
              name={t.Teamtitle}
              logo={require("@/assets/images/ulogo.png")}
              Tid={t.Tid}
              liked={true}
            />
            </View>
          ))}
          {!teams && <Text style = {styles.noGameTitle}>No Teams Liked</Text>}
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
  noGameTitle : {
    fontSize : 24,
    marginInline : 16
}
});

export default HomeTeamList;
