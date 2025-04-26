import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ProfilePage from '@/pages/Profile/ProfilePage'
import { SafeAreaView } from 'react-native-safe-area-context'


const profile = () => {
  return (
    <SafeAreaView>
      <ProfilePage/>
    </SafeAreaView>
  )
}

export default profile