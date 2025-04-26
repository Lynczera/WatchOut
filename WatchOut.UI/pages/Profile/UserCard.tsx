import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

interface userCardProps  {
    profilePicture : ImageSourcePropType;
    profileName: string;
};
const UserCard = ({profilePicture, profileName}: userCardProps) => {
  return (
    <View style={styles.profileContainer}>
      <Image source={profilePicture} resizeMode='contain'style={styles.profilePictureStyle}/> 
      <View style = {styles.profileHeaderStyle}>
      <Text>{profileName}</Text>
      <Icon
                name="check-circle"
                size={15}
                color='#3698ef'
                />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    profilePictureStyle:{
        borderWidth: 1,
        borderRadius: 120,
        width: 75,
        height: 75,
    },
    profileContainer:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 16,
        marginBottom :32,
    },
    profileHeaderStyle : {
      display : "flex",
      flexDirection : "row",
      gap : 5,
      justifyContent: "center",
      alignItems : "center",
      marginTop : 8
    }
})
export default UserCard