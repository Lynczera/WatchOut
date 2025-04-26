import { Team } from '@/types/team';
import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


type Event = {
    barName: string;
    address: string;
};


interface TeamModalProps {
  name: string;
  gameTime: string;
  logo: any;
  visible: boolean;
  onClose: () => void;
  events: Event[];
};

const TeamModal = ({name, gameTime, logo, visible, onClose, events } : TeamModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon
                name="close"
                size={30}
                color='black'
                />
          </TouchableOpacity>
          <Image source={logo} style={styles.imageLayout} resizeMode="contain" />
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.eventTitle}>Upcoming Games:</Text>
          <ScrollView style={styles.scrollview}>
            {events.map((item, index) => (
              <View key={index} style={styles.eventContainer}>
                <Text style={styles.barName}>{item.barName}</Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,30,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingTop: 5,
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5
  },
  imageLayout: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  gameTime: {
    fontSize: 16,
    color: 'gray'
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  eventContainer: {
    marginBottom: 10
  },
  barName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 14,
    color: 'gray'
  },
  scrollview: {
    maxHeight: 175
  }
});

export default TeamModal;