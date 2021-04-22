import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row, Card, Accordion} from 'react-bootstrap'
import CreateGoalModal from '../components/CreateGoalModal'
import GoalList from './Goals/GoalList'

let ClassPage = function({ route, navigation}){
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
   const [goals, setGoals] = useState(sampleGoal);
   const [goalProgress, setGoalProgress] = useState(0);
   const { className } = route.params;
  
   let names = ["Day 1 Quiz", "Day 2 Video", "Sample Task"];

   let quizzes = [];

   // OG quiz page
   let selectOption1 = () => {
      navigation.navigate('QuizPage');
   };

   // for the video quiz page
   let selectOption2 = () => {
      navigation.navigate('QuizVideo');
   };

   let selectOption3 = () => {
      navigation.navigate('TaskPage')
   };

   quizzes.push(<ListGroup.Item onClick={selectOption1}>
      <h3>{names[0]}</h3>
   </ListGroup.Item>);

   quizzes.push(<ListGroup.Item onClick={selectOption2}>
      <h3>{names[1]}</h3>
   </ListGroup.Item>);

   quizzes.push(<ListGroup.Item onClick={selectOption3}>
      <h3>{names[2]}</h3>
   </ListGroup.Item>);



   return (
      <View>
         <h2>{className}</h2>
         <ListGroup>
            {quizzes}
         </ListGroup>
         <GoalList 
          goals={goals}
          setGoals={setGoals}
          goalProgress={goalProgress}
          setGoalProgress={setGoalProgress}
          navigation={navigation}/>
         <Button 
          onClick={() => 
          navigation.navigate('CreateGoalPage', 
          {
            goals: goals, 
            setGoals: setGoals
          })}>
            Create Goal
         </Button>
      </View>
   );
}

export default ClassPage;