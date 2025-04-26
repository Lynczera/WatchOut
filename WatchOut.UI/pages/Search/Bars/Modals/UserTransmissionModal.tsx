import { Schedule } from "@/services/modules/channel-entity/types";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity, ImageSourcePropType,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface UserTransmissionModalProps {
  visible: boolean;
  onClose: () => void;
  logo: ImageSourcePropType;
  channelname: string;
  tid: number;
  schedule : Schedule | null
}

const UserTransmissionModal = ({
  visible,
  logo,
  channelname,
  tid,
  onClose,
  schedule
}: UserTransmissionModalProps) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
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
            {schedule &&  <Text style={{fontSize : 24, margin : 12}}>Currently Streaming:</Text>}
          
            <Text style={styles.modalTitle}>{schedule? schedule.Title : "Channel is not streaming sports at the time..."}</Text>
          </View>
          <View style={styles.btnContainer}>
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
    fontSize: 16,
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

export default UserTransmissionModal;
