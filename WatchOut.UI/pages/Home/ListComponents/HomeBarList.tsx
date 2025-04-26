import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FavoriteBar } from "@/types/favoriteBar";
import { barService } from "@/services/modules/bar-entity";
import BarCard from "../CardComponents/BarCard";

interface HomeBarListProps {
  user: string;
}

const HomeBarList = ({ user}:HomeBarListProps) => {

  const { data: teams } = useQuery<FavoriteBar[]>({
    queryKey: ["favorite", "bars"],
    queryFn: async () => {
      return await barService.getFavorites(user)
    },
    placeholderData: [],
  });
  const getLogo = (Oid : string) => {
    switch (Oid) {
      case "67f71da90012e76d4af7":
        return require("@/assets/images/greenpig.jpeg");
      case "67f770ae002b9f031c06":
        return require("@/assets/images/beertime.jpeg");
      case "6808c451003876fb8126":
        return require("@/assets/images/alumni.jpg");
      default:
        return require("@/assets/images/lakeeffect.jpg");
      }
    };
  
  return (
    <View>
      <ScrollView style={styles.listContainer}>
        {teams &&
          teams.map((b) => (
            <View key={b.Oid}>
              <BarCard
                Oid={b.Oid}
                name={b.Ownername}
                image={getLogo(b.Oid)}
                liked={true}
                user={user}
              />
            </View>
          ))}
          {!teams && <Text style = {styles.noGameTitle}>No Bars Liked</Text>}
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
export default HomeBarList;
