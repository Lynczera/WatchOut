import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UpGamesList from './List/UpGamesList';
import { User } from '@/types/user';
import { userService } from '@/services/modules/user-entity';
import { useAuth } from '@/context/AuthContext';

const FeedbackPage = () => {
    type FilterType = "Upcoming" | "Past";
    const[activeTab, setActiveTab] = useState<FilterType>("Upcoming");
      const [currUser, setCurrUser] = useState<User>()
      const {user} =useAuth()

      useEffect(() =>{
        userService.getUser(user.$id).then(res => {setCurrUser(res)})
      }, [])
    
  return (
    currUser&&
    <View style = {style.feedbackPageContainer}>
      <View style = {style.tabsContainer}>
        <TouchableOpacity
          style = {[
            style.tab, 
            activeTab == "Upcoming" && style.activeTab,
          ]}
          onPress = {() => {
            setActiveTab("Upcoming");
            }}>
            <Text style={[style.tabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {[
            style.tab, 
            activeTab == "Past" && style.activeTab,
          ]}
          onPress = {() => {
            setActiveTab("Past");
            }}>
            <Text style={[style.tabText]}>Past</Text>
        </TouchableOpacity>
      </View>
      <View style = {style.listContainer}>
      {activeTab == 'Upcoming' && <UpGamesList searchQuery='' user={currUser.Id}/>}
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  feedbackPageContainer:{
    height: "100%",
    justifyContent: "space-between",
  },
  tabsContainer:{
    flexDirection: "row",
    marginBlock: 8,
    paddingBottom: 8,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    height: 50,
  },
  tab:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabText:{
    fontSize: 16,
  },
  activeTab:{
    borderBottomWidth: 1,
  },
  activeTabText:{
    color: '#fff',
    fontWeight: 'bold',
  },
  discussionsList:{
    padding: 20,
    
  },
  listContainer:{
    marginInline: 16,
    flex : 1,
    flexGrow : 1
  },
});
export default FeedbackPage