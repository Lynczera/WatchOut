import { api } from '@/services/api';
import { barService } from '@/services/modules/bar-entity';
import { Transmission, TransmissionResponse } from '@/types/transmission';
import { useRoute } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { lazy, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface BarCardProps {
  Oid : string
  name: string;
  address: string;
  image: any;
  liked : boolean
  user : string
};

const BarCard = ({name, address, image, Oid, liked, user} : BarCardProps)=> {

    const router = useRouter()
    const queryClient = useQueryClient();
    const [curr_img, set_currImage] = useState("")

    const getLogo = () => {
    switch (Oid) {
      case "67f71da90012e76d4af7":
        return require("@/assets/images/greenpig.jpeg");
      case "67f770ae002b9f031c06":
        return require("@/assets/images/beertime.jpeg");
      case "6808c451003876fb8126":
        return require("@/assets/images/alumni.jpg");
      default:
        return require("@/assets/images/lakeeffect.jpg");
      }
    };
  
    const logo = getLogo();


  const toggleLike = async () => {
    if (!liked) {
      try {
        await barService.favorite(user, Oid);
      } catch (e) {
        alert("Couldn't like game");
        console.log(e);
      }
    } else {
      try {
          await barService.unfavorite(user, Oid);
      } catch (e) {
        alert("Couldn't unlike game");
      }
    }
    queryClient.invalidateQueries(["favorite"]);
    queryClient.invalidateQueries(["games"]);
  };

    const { data: transmissions } = useQuery<Transmission[]>({
      queryKey: ['transmissions', Oid],
      queryFn: async () => {
        const response = await api.get<TransmissionResponse>(
          'event/transmissionsByOwner', {params: { ownerID : Oid}}
        );
        
        return response.data.transmissions;
      },
    });

    const handleProfileView = ()=>{
      router.push(`/searchBars/${Oid}`)
    }
  
    return (
      <TouchableOpacity key={Oid} onPress={handleProfileView}>
    <View style={styles.cardLayout}>
      <View style={styles.titleGap}>
        <View style={styles.title}>
          <Text style={styles.barName}>{name}</Text>
             {transmissions &&
                <Text style={styles.liveText}>Live</Text>
             }
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
                color={liked ? 'red' : 'transparent'}
                />
          </TouchableOpacity>
        </View>
        <Text style={styles.address}>{address}</Text>
      </View>
      <Image source={logo} style={styles.imageLayout} resizeMode='cover'/>
    </View>
    </TouchableOpacity>

    );
  };
const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  titleGap: {
    justifyContent: 'space-around',
    padding: 10
  },
  barName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: 'gray'
  },
  heartBorder: {
    position: 'absolute'
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 75,
    overflow: 'hidden'
  },
  imageLayout: {
    width: 75,
    height: '100%',
  },
  liveText: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    borderRadius: 5,
    padding: 1,
    paddingBlock: 2,
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default BarCard;
