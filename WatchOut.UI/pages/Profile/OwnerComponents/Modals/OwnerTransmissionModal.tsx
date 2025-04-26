import { api } from "@/services/api";
import { Game, GamesResponse } from "@/types/game";
import { GameEvent } from "@/types/event";
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
  ImageSourcePropType,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { transmissionService } from "@/services/modules/transmission-entity";

interface OwnerTransmissionModalProps {
  visible: boolean;
  onClose: () => void;
  logo: ImageSourcePropType;
  channelname: string;
  gameTime: string;
  description: string;
  game: string;
  tid: number;
}

const OwnerTransmissionModal = ({
  visible,
  onClose,
  logo,
  channelname,
  game,
  gameTime,
  description,
  tid,
}: OwnerTransmissionModalProps) => {
  const queryClient = useQueryClient();

  const handleCancelCreate = () => {
    onClose();
  };

  const handleYes = async () => {
    try {
      await transmissionService.stopById(tid);
    } catch (error) {
      alert("Could not delete event");
    }
    queryClient.invalidateQueries("transmissions");
    onClose();
  };

  const handleNo = () => {};

  const handleDeleteTransmission = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to stop your transmission?",
      [
        {
          text: "No",
          onPress: handleNo,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleYes,
        },
      ]
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancelCreate}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCancelCreate}
            style={styles.closeButton}
          >
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.TitleContainer}>
            <Text style={styles.titleText}>{channelname}</Text>
            <Image
              source={logo}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitle}>{game}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.deleteBtnStyle}
              onPress={handleDeleteTransmission}
            >
              <Text style={styles.deleteBtnTextStyle}>Stop Transmission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  deleteBtnStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 50,
    backgroundColor: "darkred",
    marginBlock: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  deleteBtnTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  btnContainer: {
    width: "100%",
    marginTop: 16,
  },
  modalTitleView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 32,
  },
  TitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  eventDescription: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    alignSelf: "center",
    padding: 4,
  },
  descContainer: {
    width: "100%",
    gap: 4,
  },
});

export default OwnerTransmissionModal;
