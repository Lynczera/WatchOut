import { View, Text, StyleSheet, PermissionsAndroid, Platform  } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
import EventModal from '@/pages/Search/Events/Modals/EventModal';
import * as TaskManager from 'expo-task-manager';
import notification from '@/services/modules/notification-entity/notification';
import { useQuery } from '@tanstack/react-query';
import { Bar } from '@/types/bar';
import { barService } from '@/services/modules/bar-entity';
import { useAuth } from '@/context/AuthContext';
import { Transmission } from '@/types/transmission';
import { transmissionService } from '@/services/modules/transmission-entity';
import { SafeAreaView } from 'react-native-safe-area-context';


// const bars = [
//     {
//       id: 1,
//       name: "Green Pig Pub",
//       latitude: 40.760921,
//       longitude: -111.889862,
//       game: "Lakers vs. Warriors"
//     },
//     {
//       id: 2,
//       name: "Legends Pub and Grill",
//       latitude: 40.754461,
//       longitude: -111.896193,
//       game: "Raptors vs. Heat"
//     }
//   ];

const MapPage = () => {

    const [location, setLocation] = useState<Location.LocationObject>()
    const [geofences, setGeofences] = useState<any[]>([]);
    const [barsWTrans, setBarsWTrans] = useState<Bar[]>([])

    const [createEventModalVisible, setCreateEventModalVisible] =
        useState<boolean>(false);
        const {user} =useAuth()
    const onclose = () => {
        setCreateEventModalVisible(false);
    };
    
    const { data: bars } = useQuery<Bar[]>({
      queryKey: ["bars" ],
      placeholderData : [],
      queryFn: async () => {
        const bars = await barService.getByName("", user.$id);
        bars.forEach(async (b)=>{
          let currbar =  await transmissionService.getByOwner(b.Oid)
          if (currbar && currbar.length >0){
            setBarsWTrans( [...barsWTrans, b])
          }
        })
        return bars
      },
    },);

    const LOCATION_TASK_NAME = 'background-location-task';

    const GEOFENCE_TASK_NAME = 'barGeofenceTask';

    useEffect(() => {
      async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
  
      getCurrentLocation();
    }, []);

    // TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data, error }: TaskManager.TaskManagerTaskBody) => {
    //   if (error) {
    //     return Promise.reject(error);
    //   }
    
    //   const { eventType, region } = data as {
    //     eventType: Location.GeofencingEventType;
    //     region: Location.LocationRegion;
    //   };
    
    //   if (eventType === Location.GeofencingEventType.Enter) {
    //     notification.showNotification(`You're near ${region.identifier}`, 'They are playing your liked game');
    //   } else if (eventType === Location.GeofencingEventType.Exit) {
    //   }
    
    //   return Promise.resolve();
    // });

    const requestPermissions = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        console.log("foreground ok");

        // const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        // console.log("permission for back is ", backgroundStatus); 
        // if (backgroundStatus === 'granted') {
        //   await setupGeofence()
        //   console.log("done geofencing");
        // }else{
        //   console.log("background not ok");
        // }
      }
    };


    // TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    //   console.log("running task");
    //     if (error) {
    //       // Handle the error, e.g., log it
    //       console.error('Error in background location task:', error.message);
    //       return Promise.reject(error); // Return a rejected promise
    //     }
      
    //     if (data) {
    //       const { locations } = data as { locations: Location.LocationObject[] };
    //       // Do something with the locations captured in the background
    //       console.log('Locations captured in the background:', locations);
    //     }
      
    //     return Promise.resolve(); // Return a resolved promise to indicate task completion
    //   });
      
  
    useEffect(() => {
      requestPermissions();
    }, []);


    // const setupGeofence = async () => {
    //   console.log("start geofencing");
    //     try {
    //       if(bars){
    //         const fenceList = bars.map(bar => ({
    //           id: bar.Name,
    //           latitude: bar.Lat,
    //           longitude: bar.Long,
    //           radius: 10,
    //           notifyOnEnter: true,
    //           notifyOnExit: false,
    //         }));
      
    //         setGeofences(fenceList);
  
    //         const alreadyStarted = await Location.hasStartedGeofencingAsync(GEOFENCE_TASK_NAME);
    //         if (!alreadyStarted) {
    //           await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, fenceList);
    //         }
                
    //         return "done"
    //       }
        
    //     } catch (error) {
    //       console.error('Error setting up geofences:', error);
    //     }
    //   };

    return (
<MapView style = { styles.mapStyle }
      initialRegion={location && {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05
      }}
        showsUserLocation = {true}
        >
            
      { bars && bars.map((bar, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: bar.Lat,
              longitude: bar.Long
            }}
            title={bar.Name}
          >
            <Callout>
              <View>
                  <Text>{bar.Name}</Text>
                  {barsWTrans.includes(bar)? <Text style={styles.liveText}>Live</Text> : <Text style={styles.offText}>Offline</Text>  }
                  
              </View>
            </Callout>
          </Marker>
        )
      })}
    </MapView>
  )
}
  
  const styles = StyleSheet.create ({
    mapStyle: {
height:'100%'
    },
    liveText: {
      color: 'red',
      padding: 1,
      paddingBlock: 2,
      fontSize: 10,
      fontWeight: 'bold',
      textAlign : 'center'
    },
    offText: {
      padding: 1,
      paddingBlock: 2,
      fontSize: 10,
      fontWeight: 'bold',
      textAlign : 'center'
    }
  })

export default MapPage
