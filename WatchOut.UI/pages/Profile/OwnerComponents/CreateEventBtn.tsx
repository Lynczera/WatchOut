import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateEventModal from "../OwnerComponents/Modals/CreateEventModal";


interface CreateEventBtnProps {
  onClosed? : ()=>void
  user : string
}


const CreateEventBtn = ({onClosed, user}: CreateEventBtnProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] = useState<boolean>(false)
  
const onclose = ()=>{
  setCreateEventModalVisible(false)
}
  return (
    <View style={style.modalContainer}>
    <CreateEventModal visible= {createEventModalVisible} onClose={onclose} user={user} />

<TouchableOpacity style={style.btnStyle} onPress={()=>{setCreateEventModalVisible(true)}}>
        <Icon
            name="plus-circle"
            size={20}
            color='white'
            />
  
  <Text style={style.btnTextStyle}>Create Event</Text>
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
export default CreateEventBtn;
