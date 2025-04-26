import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CreateEventModal from "./Modals/CreateEventModal";
import StartStreamModal from "../OwnerComponents/Modals/StartStreamModal";

interface StartStreamBtnProps {
  onClosed? : ()=>void
  user : string
}

const StartStreamBtn = ({onClosed, user}: StartStreamBtnProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] = useState<boolean>(false)
  
  const onclose = ()=>{
    setCreateEventModalVisible(false)
  }

  return (
    <View style={style.modalContainer}>
      <StartStreamModal user={user} visible= {createEventModalVisible} onClose={onclose} />

      <TouchableOpacity style={style.btnStyle} onPress={()=>{setCreateEventModalVisible(true)}}>
        <Icon 
          name="play-circle" 
          size={20} 
          color="white" 
          />
        <Text style={style.btnTextStyle}>Start Stream</Text>
      </TouchableOpacity>
    </View>
  );
};


const style = StyleSheet.create({
  modalContainer : {
    width : "40%"
  },
  btnStyle: {
    display: "flex",
    flexDirection : "row",
    gap : 10,
    width: "100%",
    height: 50,
    backgroundColor: "black",
    color: "white",
    marginBlock: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnTextStyle: {
    color: "white",
  },
});
export default StartStreamBtn;
