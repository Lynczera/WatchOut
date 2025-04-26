import { View, Text } from 'react-native'
import React from 'react'
import SearchPage from '@/pages/Search/SearchPage'
import { SafeAreaView } from 'react-native-safe-area-context'

const search = () => {
  return (
    <SafeAreaView >
      <SearchPage/>
    </SafeAreaView>
  )
}

export default search