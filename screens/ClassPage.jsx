import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row} from 'react-bootstrap'
<<<<<<< HEAD
import YoutubePlayer from 'react-native-youtube-iframe';
=======
import CreateGoalModal from '../components/CreateGoalModal'
import {useSelector} from 'react-redux';
>>>>>>> 38da3259f00b7c436bf892d74e1b33cedca37b06

let ClassPage = function({ route, navigation }){
   const [showGoalModal, setShowGoalModal] = useState(false);
   const [goalCmp, setGoalCmp] = useState([]);
   const { className } = route.params;
   let names = ["Day 1 Quiz", "Day 2 Video", "Other"];
   let quizzes = [];
   let goals = [{assgn:"Day 1 Quiz", time:"Tomorrow"}];
   let goalComponents = [];

   // OG quiz page
   let selectOption1 = () => {
      navigation.navigate('QuizPage');
   };

<<<<<<< HEAD
   // for the video quiz page
   let selectOption2 = () => {
      navigation.navigate('QuizEmbed');
   };

   quizzes.push(<ListGroup.Item onClick={selectOption1}>
      <h3>{names[0]}</h3>
   </ListGroup.Item>);

   quizzes.push(<ListGroup.Item onClick={selectOption2}>
      <h3>{names[1]}</h3>
   </ListGroup.Item>);
=======
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

>>>>>>> 38da3259f00b7c436bf892d74e1b33cedca37b06

   quizzes.push(<ListGroup.Item onClick={selectOption1}>
      <h3>{names[2]}</h3>
   </ListGroup.Item>);

/*
   names.forEach(name => {
      quizzes.push(<ListGroup.Item onClick={selectOption1}>
         <h3>{name}</h3>
      </ListGroup.Item>);
   });
<<<<<<< HEAD
*/
=======

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


>>>>>>> 38da3259f00b7c436bf892d74e1b33cedca37b06
   

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