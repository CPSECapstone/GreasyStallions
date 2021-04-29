import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row, Card, Accordion} from 'react-bootstrap'
import CreateGoalModal from '../components/CreateGoalModal'
import GoalList from './Goals/GoalList'

let ClassPage = function({ route, navigation }){
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
   console.log(className)
   
   let names = ["Day 1 Quiz", "Day 2 Video", "Day 3 Article"];

   let quizzes = [];

   // OG quiz on a single page
   let selectOption1 = () => {
      navigation.navigate('QuizPage');
   };

   // for the video quiz page
   let selectOption2 = () => {
      navigation.navigate('QuizVideo');
   };

   // for the multiple pages quiz view
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
         <div className="my-2 text-left">
            <Button variant="primary" size="sm"
            onClick={() => 
               navigation.navigate('MissionPage',
               {
                  quizzes
               })}>
               View All Missions
            </Button>
         </div>
         <GoalList 
          goals={goals}
          setGoals={setGoals}
          goalProgress={goalProgress}
          setGoalProgress={setGoalProgress}
          navigation={navigation}/>
         <div className="my-2 text-center">
            <Button variant="primary" size="lg"
            onClick={() => 
              navigation.navigate('CreateGoalPage', 
              {
                  goals: goals, 
                  setGoals: setGoals
              })}>
               Create Goal
            </Button>
         </div>
      </View>
   );
}

export default ClassPage;