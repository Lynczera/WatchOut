import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import UserTransmissionModal from "../Modals/UserTransmissionModal";
import { Schedule } from "@/services/modules/channel-entity/types";
import { channelService } from "@/services/modules/channel-entity";
interface EventCardProps {
  channelName: string;
  description: string;
  logo: ImageSourcePropType;
  Oid: number;
  Tid: number;
  cid: number;
}

const TransmissionCard = ({
  description,
  logo,
  channelName,
  Oid,
  Tid,
  cid,
}: EventCardProps) => {
  const [createEventModalVisible, setCreateEventModalVisible] =
    useState<boolean>(false);
  const [currProgram, setCurrProgram] = useState<Schedule | null>();

  useEffect(() => {
    channelService.getScheduleByChannel(cid).then((e) => {
      setCurrProgram(e);
    });
  }, []);

  const onclose = () => {
    setCreateEventModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{channelName}</Text>
            {currProgram && <Text style={styles.liveText}>Ongoing</Text>}
          </View>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode="contain" />
        <UserTransmissionModal
          schedule={currProgram ? currProgram : null}
          visible={createEventModalVisible}
          onClose={onclose}
          logo={require("@/assets/images/ulogo.png")}
          channelname={channelName}
          tid={Tid}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  liveText: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    borderRadius: 5,
    padding: 1,
    paddingBlock: 2,
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    maxWidth: 250,
  },
  titleGap: {
    justifyContent: "space-around",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gameTime: {
    fontSize: 14,
    color: "gray",
  },
  heartBorder: {
    position: "absolute",
  },
  cardLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    height: 75,
    width: "100%",
    backgroundColor: "white",

    alignItems: "center",
  },
  imageLayout: {
    width: 55,
    height: 55,
  },
});

export default TransmissionCard;
