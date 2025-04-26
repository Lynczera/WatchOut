import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import OwnerTransmissionModal from './TransmissionModal';

interface EventCardProps {
  channelName: string;
  description: string;
  logo: ImageSourcePropType;
  Oid: number
  Tid: number
};

const TransmissionCard = ({description,logo, channelName, Oid, Tid}:EventCardProps) => {

  const [createEventModalVisible, setCreateEventModalVisible] = useState<boolean>(false)
  
  const onclose = ()=>{
    setCreateEventModalVisible(false)
  }
  
    return (
    <TouchableOpacity onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{channelName}</Text>
          </View>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode='contain'/>
        <OwnerTransmissionModal
        visible= {createEventModalVisible} 
        onClose={onclose} 
        logo={require('../../../assets/images/ulogo.png')}
        game={''}
        gameTime={'12:00'}
        description={description}
        channelname = {channelName}
        tid={Tid}
        />
      </View>
    </TouchableOpacity>
    );
  };
const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
    maxWidth: 250
  },
  titleGap: {
    justifyContent: 'space-around'
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameTime: {
    fontSize: 14,
    color: 'gray',
  },
  heartBorder: {
    position: 'absolute'
  },
  cardLayout: {
    display : 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    height: 75,
    width: "100%",
    backgroundColor: 'white',

    alignItems: 'center'
  },
  imageLayout: {
    width: 55,
    height: 55,
  }
});

export default TransmissionCard;
