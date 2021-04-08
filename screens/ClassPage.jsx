import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row} from 'react-bootstrap'
import CreateGoalModal from '../components/CreateGoalModal'
import {useSelector} from 'react-redux';

let ClassPage = function({ route, navigation }){
   const [showGoalModal, setShowGoalModal] = useState(false);
   const [goalCmp, setGoalCmp] = useState([]);
   const { className } = route.params;
   let names = ["Day 1 Quiz", "Other", "Other"];
   let quizzes = [];
   let goals = [{assgn:"Day 1 Quiz", time:"Tomorrow"}];
   let goalComponents = [];

   let selectOption = () => {
      navigation.navigate('QuizPage');
   };

   let openGoalModal = () => {
      setShowGoalModal(true);
   };

   let closeGoalModal = (res) => {
      if (res){
         console.log("res")
         console.log(res)
         goals.push({assgn: res.assgn, time: res.time})
         console.log(goals)
      }
      setShowGoalModal(false);
   }


   names.forEach(name => {
      quizzes.push(<ListGroup.Item onClick={selectOption}>
         <h3>{name}</h3>
      </ListGroup.Item>);
   });

   goals.forEach(goal => {
      let component = 
      <ListGroup.Item>
         <Row>
            <Col sm={6}>
               {goal.assgn}
            </Col>
            <Col sm={6}>
               {goal.time}
            </Col>
         </Row>
      </ListGroup.Item>
      goalComponents.push(component)
   });
   console.log("rerun");
   console.log(goals)
   // setGoalCmp(goalComponents);


   

   return (
      <View>
         <h2>{className}</h2>
         <ListGroup>
            {quizzes}
         </ListGroup>
         <h2>Goals:</h2>
         <ListGroup>
            {goalComponents}
         </ListGroup>
         <Button onClick={openGoalModal}>
            Create Goal
         </Button>
         <CreateGoalModal 
            show={showGoalModal}
            assignments={names}
            onDismiss={closeGoalModal}
            />
      </View>
   );
}

export default ClassPage;