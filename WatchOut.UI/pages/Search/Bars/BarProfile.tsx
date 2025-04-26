import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import UserCard from "@/pages/Profile/UserCard";
import CreateEventBtn from "@/pages/Profile/OwnerComponents/CreateEventBtn";
import StartStreamBtn from "@/pages/Profile/OwnerComponents/StartStreamBtn";
import { useEffect, useState } from "react";
import EventList from "./List/EventList";
import { Bar } from "@/types/bar";
import { barService } from "@/services/modules/bar-entity";
import { channelService } from "@/services/modules/channel-entity";

interface BarProfileProps {
  Oid: string,
}

const BarProfile = ({ Oid }: BarProfileProps) => {

  type FilterType = "transmission" | "events";
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("events");

    const [currBar, setCurrBar] = useState<Bar>()
  
    useEffect(() =>{
      barService.getById(Oid).then(res => {setCurrBar(res)})
    }, [])

  return (
    currBar?
    <View style={style.profilePageContainer}>
      <View style={style.profileInfoContainer}>
        <UserCard
          profilePicture={require("../../../assets/images/greenpig.jpeg")}
          profileName={currBar.Name}
        />
        <Text style={{textAlign:'center', fontSize :16}}>Address: {currBar.Address}</Text>
      </View>
      <View style={style.filterContainer}>
        <TouchableOpacity
          style={[
            style.filterButton,
            selectedFilter == "events" && style.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("events");
          }}
        >
          <Text style={style.filterTextStyle}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.filterButton,
            selectedFilter == "transmission" && style.selectedFilter,
          ]}
          onPress={() => {
            setSelectedFilter("transmission");
          }}
        >
          <Text style={style.filterTextStyle}>Transmissions</Text>
        </TouchableOpacity>
      </View>
      
      <EventList
        filter={selectedFilter}
        ownerId={Oid}
      />
    </View> : <Text>"unavailable bar"</Text>

  );
};

const style = StyleSheet.create({
  profilePageContainer: {
    display: "flex",
    flexDirection: "column",
    height: 620,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  profileInfoContainer: {
    marginTop: 25
  },
  listContainer: {
    marginInline: 16,
    height: 500,
  },
  eventText: {
    marginBottom: 8
  },
  filterContainer: {
    flexDirection: "row",
    marginBlock: 8,
    paddingBottom: 8,
    justifyContent: 'space-around',
    borderBottomWidth: 1
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  selectedFilter: {
    borderBottomWidth: 1
  },
  filterTextStyle: {
    fontSize: 16,
  },
})

export default BarProfile;
