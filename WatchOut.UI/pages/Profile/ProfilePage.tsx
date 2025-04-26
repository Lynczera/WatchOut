import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import UserCard from "@/pages/Profile/UserCard";
import CreateEventBtn from "@/pages/Profile/OwnerComponents/CreateEventBtn";
import StartStreamBtn from "@/pages/Profile/OwnerComponents/StartStreamBtn";
import EventList from "@/pages/Profile/OwnerComponents/List/EventList";
import { useEffect, useState } from "react";
import { userService } from "@/services/modules/user-entity";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { notificationService } from "@/services/modules/notification-entity";

const ProfilePage = () => {
  type FilterType = "transmission" | "events";
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("events");
  const [currUser, setCurrUser] = useState<User>();
  const { user, session, signout } = useAuth();

  useEffect(() => {
    if (user) {
      userService.getUser(user.$id).then((e) => {
        setCurrUser(e);
      });
    }
  }, []);
  return currUser ? (
    <View style={style.profilePageContainer}>
      <View style={currUser.Role=="Customer" ? style.profileInfoContainerCustomer : style.profileInfoContainerOwner}>
        <UserCard
          profilePicture={require("../../assets/images/greenpig.jpeg")}
          profileName={currUser.Name}
        />
              {currUser.Role==="Owner" &&
              <View >
              <TouchableOpacity style={style.logoutstyleowner} onPress={signout}>
                <Text style={style.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
      }
      </View>
      {/* {currUser.Role==="Owner" &&
              <View style={style.logoutconto}>
              <TouchableOpacity style={style.button} onPress={signout}>
                <Text style={style.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
      } */}
      {currUser.Role == "Owner" && (
        <View style={style.ownerFeats}>
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
          <View style={style.listContainer}>
            <EventList filter={selectedFilter} ownerId={currUser.Id} />
          </View>
          <View style={style.btnContainer}>
            <CreateEventBtn user={currUser.Id} />
            <StartStreamBtn user={currUser.Id} />
          </View>
        </View>
      )}
      {currUser.Role==="Customer" &&
              <View style={style.logoutcontc}>
              <TouchableOpacity style={style.button} onPress={signout}>
                <Text style={style.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={()=>notificationService.showNotification("Your are at Alumni House UofU", "Demo Day At the U!")}>
                <Text style={style.buttonText}>Notify</Text>
              </TouchableOpacity>
            </View>
      }

    </View>
  ) : (
    // <Redirect href={"/"}/>
    <Text></Text>
  );
};

const style = StyleSheet.create({
  profilePageContainer: {
    justifyContent: "flex-start",
    height: "100%",
    marginTop: 50,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,

  },
  profileInfoContainerOwner: {
    height: 130,
    display:'flex',
    flexDirection : 'row',
    justifyContent : 'flex-end',
    
  },
  profileInfoContainerCustomer: {
    height: 130,
    display:'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    
  },
  listContainer: {
    marginInline: 8,
    marginTop: 10,
    height: "80%",
  },
  eventText: {
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    height: 50,
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
  ownerFeats: {
    height: "76%",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    margin: 10,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  logoutcontc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutstyleowner:{
    backgroundColor: "black",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    margin: 5,
    width: 100,
marginLeft : 50
  }
});

export default ProfilePage;
