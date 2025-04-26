import { View } from 'react-native';
import React from 'react';
import HomePage from '@/pages/Home/HomePage';
import { SafeAreaView } from 'react-native-safe-area-context';

const home = () => {
  return (
    <SafeAreaView>
      <HomePage/>
    </SafeAreaView>
  )
}

export default home