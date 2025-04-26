import { api } from "@/services/api";
import { Game, GamesResponse } from "@/types/game";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { gameService } from "@/services/modules/game-entity";
import { EventEntity } from "@/types/event";
import { eventService } from "@/services/modules/event-entity";
import { GameLike } from "@/types/gamelike";

interface CreateEventModalProps {
  visible: boolean;
  user : string
  onClose: () => void;
  game : GameLike
}

const CreateEventModal = ({ visible, onClose, user , game}: CreateEventModalProps) => {
  const [searchQuery, setSearchQuery] = useState(game.Title);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient()

  const handleCancelCreate = () => {
    onClose();
    setDescription("");
    setTitle("");
  };
//2025-04-06 03:00:00
  const handleConfirm = async () => {
    try {
      const currGame = game as GameLike
      const selectedgid = currGame.Gid as number
      await eventService.create({
        eventTitle : title,
        eventDescription : description,
        eventTime : currGame.Time.replace("T"," ").split("Z")[0],
        gameid : selectedgid,
        ownerid : user
      })

      onClose();
      setDescription("");
      setSearchQuery("");
      setTitle("");
      queryClient.invalidateQueries(["events"])
    } catch (e) {
      alert("Invalid game")
      console.log(e);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancelCreate}
    >
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>

      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCancelCreate}
            style={styles.closeButton}
          >
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitle}>Create Event</Text>
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              placeholder="Title"
              style={styles.inputBox}
              onChangeText={setTitle}
              value={title}
            />

            <Text style={styles.inputLabel}>Game</Text>
            <TextInput
              style={styles.inputBox}
              value={game.Title}
              editable = {false}
            />
            <Text style={styles.inputLabel}>Description</Text>

            <TextInput
              placeholder="Description"
              placeholderTextColor={"grey"}
              style={styles.inputBoxDesc}
              onChangeText={setDescription}
              value={description}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.createBtnStyle} onPress={handleConfirm}>
              <Text style={styles.CreateBtnTextStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtnStyle}
              onPress={handleCancelCreate}
            >
              <Text style={styles.CancelBtnTextStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>

    </Modal>


  );
};

const styles = StyleSheet.create({
  background: {
    // display: "flex",
    flex: 1,
    backgroundColor: "rgba(0,0,30,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingTop: 5,
    alignItems: "flex-start",
    minHeight: "55%",
    maxHeight: "85%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
  },
  inputBox: {
    height: 25,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 4,
    paddingInline: 4,
    borderColor: "grey",
  },
  inputLabel: {
    fontSize: 16,
  },
  gameOptionsList: {
    marginBottom: 8,
    maxHeight: 100,
  },
  gameListOption: {
    paddingBlock: 8,
  },
  createBtnStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 50,
    backgroundColor: "black",
    marginBlock: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  cancelBtnStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    marginBlock: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
  },
  CreateBtnTextStyle: {
    color: "white",
  },
  CancelBtnTextStyle: {
    color: "black",
  },
  btnContainer: {
    width: "100%",
    marginTop: 16,
  },
  modalTitleView: {},
  modalTitle: {
    fontSize: 32,
  },
  inputBoxDesc: {
    height: 100,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 4,
    paddingInline: 4,
    borderColor: "grey",
    textAlignVertical: 'top'
  }
});

export default CreateEventModal;
