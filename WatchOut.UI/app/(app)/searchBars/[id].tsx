import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import BarProfile from '@/pages/Search/Bars/BarProfile'

const searchBar = () => {
  const {id} = useLocalSearchParams()

  return (
    <View>
      <BarProfile Oid={String(id)}/>
    </View>
  )
}

export default searchBar