import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import HomeGameList from "@/pages/Home/ListComponents/HomeGameList";
import { TouchableOpacity } from "react-native";
import HomeTeamList from "@/pages/Home/ListComponents/HomeTeamList";
import HomeBarList from "@/pages/Home/ListComponents/HomeBarList";
import HomeEventList from "@/pages/Home/ListComponents/HomeEventList";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  type FilterType = "games" | "teams" | "bars" | "events";
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("events");
  const [currUser, setCurrUser] = useState<string>("");
  const { session, user } = useAuth();

  useEffect(() => {
    if(user){
      setCurrUser(user.$id);
    }
  }, [user]);

  return (
    <View style={styles.homeContainter}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter == "events" && styles.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("events");
          }}
        >
          <Text style={styles.filterTextStyle}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter == "bars" && styles.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("bars");
          }}
        >
          <Text style={styles.filterTextStyle}>Bars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter == "teams" && styles.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("teams");
          }}
        >
          <Text style={styles.filterTextStyle}>Teams</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter == "games" && styles.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("games");
          }}
        >
          <Text style={styles.filterTextStyle}>Games</Text>
        </TouchableOpacity>
      </View>
      {selectedFilter == "games" && <HomeGameList user={currUser} />}
      {selectedFilter == "teams" && <HomeTeamList user={currUser} />}
      {selectedFilter == "bars" && <HomeBarList user={currUser} />}
      {selectedFilter == "events" && <HomeEventList user={currUser} />}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainter: {
    display: "flex"
  },
  filterContainer: {
    flexDirection: "row",
    marginBlock: 8,
    paddingBottom: 8,
    justifyContent: "space-around",
    borderBottomWidth: 1,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  selectedFilter: {
    borderBottomWidth: 1,
  },
  filterTextStyle: {
    fontSize: 16,
  },
  likeText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 16,
  },
});
export default HomePage;
