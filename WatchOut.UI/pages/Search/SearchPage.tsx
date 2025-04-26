import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchGameList from "@/pages/Search/List/SearchGameList";
import SearchTeamList from "@/pages/Search/List/SearchTeamList";
import SearchBarList from "@/pages/Search/List/SearchBarList";
import SearchEventList from "@/pages/Search/List/SearchEventList";
import { userService } from "@/services/modules/user-entity";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

function SearchPage() {
  type FilterType = "games" | "teams" | "bars" | "events";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("events");
  const [currUser, setCurrUser] = useState<string>()
  const {user} = useAuth()
  useEffect(() =>{
    setCurrUser(user.$id)

  }, [])

  if(!currUser){
    return <Redirect href="/"/>
  }

  return (
    // search bar
    currUser ?
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* filter buttons */}
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
          <Text>Events</Text>
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
          <Text>Bars</Text>
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
          <Text>Teams</Text>
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
          <Text>Games</Text>
        </TouchableOpacity>
      </View>

        {selectedFilter === "games" && (
          <SearchGameList searchQuery={searchQuery} user={currUser} />
        )}

        {selectedFilter === "events" &&
        <SearchEventList searchQuery={searchQuery} user={currUser} />
          }

        {selectedFilter === "bars" &&
        <SearchBarList searchQuery={searchQuery} user={currUser} />
          }

        {selectedFilter === "teams" &&
        <SearchTeamList searchQuery={searchQuery} user={currUser} />
          }
    </View> : <Text>"User Not Logged"</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingInline: 8,
    marginBottom : 160,
    height : 815
  },
  //search bar
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 5,
    marginBlock: 8,
  },
  //filter buttons
  filterContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#E5E5E5",
    marginRight: 8,
    borderRadius: 5,
  },
  selectedFilter: {
    backgroundColor: "lightblue",
  },
});

export default SearchPage;
