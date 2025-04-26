import { View } from 'react-native';
import React from 'react';
import FeedbackPage from '@/pages/Feedback/FeedbackPage';
import { SafeAreaView } from 'react-native-safe-area-context';

const home = () => {
  return (
    <SafeAreaView>
      <FeedbackPage/>
    </SafeAreaView>
  )
}

export default home