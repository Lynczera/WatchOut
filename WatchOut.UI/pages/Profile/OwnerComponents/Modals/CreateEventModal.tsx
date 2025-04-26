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

interface CreateEventModalProps {
  visible: boolean;
  user : string
  onClose: () => void;
}

const CreateEventModal = ({ visible, onClose, user }: CreateEventModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient()

  const [selectedGame, setSelectedGame] = useState<Game>();

  const [searchFocus, setSearchFocus] = useState<boolean>(false);

    const { data: games } = useQuery<Game[]>({
      queryKey: ["games", searchQuery],
      queryFn: async () => {
        let res = await gameService.getByTitle(searchQuery, user, "America/Denver");
        return res
      },
      placeholderData: [],
    });


  const handleCancelCreate = () => {
    onClose();
    setDescription("");
    setSearchQuery("");
    setTitle("");
  };

  const handleConfirm = async () => {
    try {
      const currGame = selectedGame as Game
      const selectedgid = currGame.Gid as number
      await eventService.create({
        eventTitle : title,
        eventDescription : description,
        eventTime : currGame.Time.split(" +")[0],
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

            <Text style={styles.inputLabel}>Games</Text>
            <TextInput
              placeholder="Search"
              style={styles.inputBox}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              placeholderTextColor={"grey"}
            />
            <ScrollView style={styles.gameOptionsList} keyboardShouldPersistTaps="handled" >
              {games &&
                searchFocus &&
                games.map((g) => (
                  <TouchableOpacity
                    key={g.Gid}
                    onPress={() => {
                      setSearchQuery(g.Title);
                      setSelectedGame(g);
                      setSearchFocus(false);
                      Keyboard.dismiss();
                    }}
                  >
                    <Text style={styles.gameListOption}>{g.Title}</Text>
                  </TouchableOpacity>
                )) }
            </ScrollView>
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
