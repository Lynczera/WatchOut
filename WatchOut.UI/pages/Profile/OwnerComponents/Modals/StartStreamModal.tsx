import { api } from "@/services/api";
import { Channel } from "@/types/channel";
import { Transmission } from "@/types/transmission";
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
import { channelService } from "@/services/modules/channel-entity";
import { transmissionService } from "@/services/modules/transmission-entity";
import { userService } from "@/services/modules/user-entity";
import { User } from "@/types/user";

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  user: string
}

const StartStreamModal = ({ visible, onClose, user }: CreateEventModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [channel, setChannel] = useState<Channel>();



  const { data: channels } = useQuery<Channel[]>({
    queryKey: ["channel", searchQuery],
    queryFn: async () => {
      return channelService.getByName(searchQuery);
    },
  });

  const handleCancelCreate = () => {
    onClose();
    setDescription("");
    setSearchQuery("");
  };

  const handleConfirm = async () => {
    try {
        const targetChannel = channel as Channel;
        transmissionService.start({
          channelid: targetChannel.Cid,
          ownerid: user,
          transmissionDescription: description,
        });
  
        onClose();
        setDescription("");
        setSearchQuery("");
        queryClient.invalidateQueries(["transmissions"]);

    } catch (e) {
      alert("failed transmission:");
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.background}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={handleCancelCreate}
              style={styles.closeButton}
            >
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.modalTitleView}>
              <Text style={styles.modalTitle}>Start Transmission</Text>
              <Text style={styles.subtitle}>What's currently playing?</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Channel</Text>
              <TextInput
                placeholder="Search"
                style={styles.inputBox}
                onChangeText={setSearchQuery}
                value={searchQuery}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                placeholderTextColor={"grey"}
              />
              <ScrollView
                style={styles.gameOptionsList}
                keyboardShouldPersistTaps="handled"
              >
                {channels &&
                  searchFocus &&
                  channels.map((c) => (
                    <TouchableOpacity
                      key={c.Cid}
                      onPress={() => {
                        setSearchQuery(c.Name);
                        setChannel(c);
                        setSearchFocus(false);
                        Keyboard.dismiss();
                      }}
                    >
                      <Text style={styles.gameListOption}>{c.Name}</Text>
                    </TouchableOpacity>
                  ))}
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
              <TouchableOpacity
                style={styles.createBtnStyle}
                onPress={handleConfirm}
              >
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
  modalTitleView: {
    gap: 8,
  },
  modalTitle: {
    fontSize: 32,
  },
  subtitle: {
    color: "gray",
  },
  inputBoxDesc: {
    height: 100,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 4,
    paddingInline: 4,
    borderColor: "grey",
    textAlignVertical: "top",
  },
});

export default StartStreamModal;
