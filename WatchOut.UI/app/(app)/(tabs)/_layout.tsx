import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { userService } from "@/services/modules/user-entity";
import { User } from "@/types/user";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default () => {
  const [currUser, setCurrUser] = useState<User>();
  const {session, user} = useAuth()
  
  if (!user){
    return <Redirect href={"/"}/>
  }

  useEffect(() => {
    userService.getUser(user.$id).then((res) => {
      setCurrUser(res);
    });
  }, []);

  return (
<Tabs screenOptions={{tabBarStyle : styles.tab}}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          href: currUser && currUser.Role == "Customer" ? "/home" : null,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
          href: currUser && currUser.Role == "Customer" ? "/map" : null,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? "map" : "map-outline"}
                color={color}
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          href: currUser && currUser.Role == "Customer" ? "/search" : null,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? "search" : "search-outline"}
                color={color}
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="feedback"
        options={{
          headerShown: false,
          href :  currUser && currUser.Role == "Owner" ? "/feedback" : null,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                color={color}
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            );
          },
        }}
      ></Tabs.Screen>
    </Tabs>


  );
};

const styles = StyleSheet.create({
  tab: {
// height: '100%'
  },
  screen : {
    // height :'100%'
  }
});