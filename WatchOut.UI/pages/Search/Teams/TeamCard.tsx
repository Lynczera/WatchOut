import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TeamModal from '@/pages/Search/Teams/Modals/TeamModal';
import { gameService } from "@/services/modules/game-entity";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamService } from '@/services/modules/team-entity';
import { Team } from '@/types/team';

interface TeamCardProps {
  logo: any;
  user : string
  team : Team
};

const TeamCard = ({team, logo , user}: TeamCardProps) => {
  const queryClient = useQueryClient();
  const [createEventModalVisible, setCreateEventModalVisible] = useState<boolean>(false);
  const toggleLike = async () => {
    if (!team.IsFav) {
          try {
            await teamService.favorite(user, team.Tid);
          } catch (e) {
            alert("Couldn't like game");
          }
        } else {
          try {
              await teamService.unfavorite(user, team.Tid);
          } catch (e) {
            alert("Couldn't unlike game");
          }
        }
        queryClient.invalidateQueries(["favorite"]);
        queryClient.invalidateQueries(["teams"]);
  };

  const onclose = () => {
    setCreateEventModalVisible(false)
  }

  return (
    // <View onPress={() => setCreateEventModalVisible(true)}>
    <View >
      <View style={styles.cardLayout}>
        {/* <TeamModal
          name={team.Name}
          gameTime={team.ParsedTime}
          logo={logo}
          visible={createEventModalVisible}
          onClose={onclose}
          events={[]}
        /> */}
        <View style={styles.titleGap}>
          <View style={styles.title}>
            <Text style={styles.teamName}>{team.Name}</Text>
            <TouchableOpacity onPress={toggleLike}>
              <Icon
                name="heart-o"
                size={20}
                color='black'
                style={styles.heartBorder}
              />
              <Icon
                name="heart"
                size={20}
                color={team.IsFav ? 'red' : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.gameTime}>{team.Time?team.ParsedTime: "No upcoming game"}</Text>
        </View>
        <Image source={logo} style={styles.imageLayout} resizeMode='contain' />
      </View>
    </View>
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
    display: 'flex',
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

export default TeamCard;
