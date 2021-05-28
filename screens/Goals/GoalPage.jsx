import React from 'react';
import { View } from 'react-native';
import GoalListStudent from './GoalListStudent'


let GoalPage = ({route, navigation}) => {

   return (
      <View>
         <GoalListStudent 
         teacher={false}
         navigation={navigation}/>
      </View>)
}
export default GoalPage;