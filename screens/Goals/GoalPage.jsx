import React, { useState } from 'react';
import { View } from 'react-native';
import GoalListStudent from './GoalListStudent'
import GoalListTeacher from './GoalListTeacher'

let GoalPage = ({route, navigation}) => {
   const {user} = route.params;
   const sampleStudentGoals = [
      {
        student_name: "Jimmy",
        goals: [{
          id: 0,
          name: "Read 10 Books", 
          subCompleted: 1, 
          due: "2021-04-06", 
          subGoals: [
          {
              title: "book1",
              complete: true
          },
          {
              title: "book2",
              complete: false
          },
          {
              title: "book3",
              complete: false
          },
          {
              title: "book4",
              complete: false
          },]
        },
        {
          id: 1,
          name: "Make a friend",
          complete: false,
          due: "2021-04-06",
        }]
      },
      {
        student_name: "Susan",
        goals: [{
          id: 0,
          name: "Read 10 Books", 
          subCompleted: 1, 
          due: "2021-04-06", 
          subGoals: [
          {
              title: "book1",
              complete: true
          },
          {
              title: "book2",
              complete: false
          },
          {
              title: "book3",
              complete: false
          },
          {
              title: "book4",
              complete: false
          },]
        },
        {
          id: 1,
          name: "Make a friend",
          complete: false,
          due: "2021-04-06",
        }]
      }
   ];
   const sampleGoal = [
      {
         id: 0,
         name: "Read 10 Books", 
         subCompleted: 1, 
         due: "2021-04-06", 
         subGoals: [
         {
            title: "book1",
            complete: true
         },
         {
            title: "book2",
            complete: false
         },
         {
            title: "book3",
            complete: false
         },
         {
            title: "book4",
            complete: false
         },]
      },
      {
         id: 1,
         name: "Make a friend",
         complete: false,
         due: "2021-04-06",
      }]
   const [studentGoals, setStudentGoals] = useState(sampleStudentGoals);
   const [goals, setGoals] = useState(sampleGoal);
   const [goalProgress, setGoalProgress] = useState(0)


   return (
      <View>
         {user === 'teacher' ?
         <GoalListTeacher
         studentGoals={studentGoals}
         setStudentGoals={setStudentGoals}
         navigation={navigation}/> :
         <GoalListStudent 
          goals={goals}
          setGoals={setGoals}
          teacher={false}
          goalProgress={goalProgress}
          setGoalProgress={setGoalProgress}
          navigation={navigation}/>}
      </View>)
}
export default GoalPage;