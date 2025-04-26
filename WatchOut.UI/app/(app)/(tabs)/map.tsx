import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import MapPage from '@/pages/Map/MapPage'
import { SafeAreaView } from 'react-native-safe-area-context'


const map = () => {
  return (
    <View>
      <MapPage/>
    </View>
  )
}

export default map