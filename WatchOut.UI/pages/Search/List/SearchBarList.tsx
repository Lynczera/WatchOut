import { ScrollView, StyleSheet, View, RefreshControl, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { barService } from "@/services/modules/bar-entity";
import { Bar } from "@/types/bar";
import BarCard from "@/pages/Search/Bars/BarCard";
import { userService } from "@/services/modules/user-entity";

interface SearchBarListProps {
  searchQuery: string;
  user: string;
}
const SearchBarList = ({ searchQuery, user }: SearchBarListProps) => {
  const { data: bars } = useQuery<Bar[]>({
    queryKey: ["bars", searchQuery],
    queryFn: async () => {
      return barService.getByName(searchQuery, user);
    },
  });

  return (
   <ScrollView style={styles.listContainer} onScroll={()=>{Keyboard.dismiss()}}>
      {bars &&
          bars.map((b) => (
            <View key={b.Oid}>
              <BarCard
                Oid={b.Oid}
                name={b.Name}
                address={b.Address}
                image={require("@/assets/images/greenpig.jpeg")}
                liked={b.IsFav}
                user={user}
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
export default SearchBarList;
