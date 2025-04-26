import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    
  return (
    <Stack>

    <Stack.Screen name='[id]' options={{headerShown : false, presentation:'modal'}}></Stack.Screen>

    </Stack>
  )
}

export default _layout