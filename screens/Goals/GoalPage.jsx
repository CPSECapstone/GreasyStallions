import React from 'react';
import { View } from 'react-native';
import GoalListStudent from './GoalListStudent'
import GoalListTeacher from './GoalListTeacher'


let GoalPage = ({route, navigation}) => {
   const {user} = route.params;

   return (
      <View>
         {user === 'teacher' ?
         <GoalListTeacher
         navigation={navigation}/> :
         <GoalListStudent 
         teacher={false}
         navigation={navigation}/>}
      </View>)
}
export default GoalPage;