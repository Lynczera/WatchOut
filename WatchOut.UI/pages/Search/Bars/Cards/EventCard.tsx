import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import UserEventModal from '../Modals/UserEventModal';
interface EventCardProps {
  name: string;
  game: string;
  description: string;
  gameTime: string;
  logo: ImageSourcePropType;
  Eid : number
};

const EventCard = ({description,gameTime,logo,name,Eid, game}:EventCardProps) => {

  const [createEventModalVisible, setCreateEventModalVisible] = useState<boolean>(false)
  
  const onclose = ()=>{
    setCreateEventModalVisible(false)
  }
  
    return (
    <TouchableOpacity onPress={() => setCreateEventModalVisible(true)}>
      <View style={styles.cardLayout}>
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{name}</Text>
          </View>
          <Text style={styles.gameTime}>{gameTime}</Text>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode='contain'/>
        <UserEventModal 
        visible= {createEventModalVisible} 
        onClose={onclose} 
        logo={require('@/assets/images/ulogo.png')}
        game={game}
        gameTime={gameTime}
        description={description}
        title = {name}
        Eid={Eid}
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

export default EventCard;
