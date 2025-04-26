import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import GameEventsPage from "@/pages/GameEvents/GameEventsPage";
import { useAuth } from "@/context/AuthContext";

const gameEvent = () => {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  return (
    <View style={{ backgroundColor: "#f8fafc", height: "100%" }}>
      <GameEventsPage gid={String(id)} user={String(user.$id)} />
    </View>
  );
};

export default gameEvent;
