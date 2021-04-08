import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row} from 'react-bootstrap'
import YoutubePlayer from 'react-native-youtube-iframe';

let ClassPage = function({ route, navigation }){

   const { className } = route.params;
   let names = ["Day 1 Quiz", "Day 2 Video", "Other"];
   let quizzes = [];

   // OG quiz page
   let selectOption1 = () => {
      navigation.navigate('QuizPage');
   };

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

   quizzes.push(<ListGroup.Item onClick={selectOption1}>
      <h3>{names[2]}</h3>
   </ListGroup.Item>);

/*
   names.forEach(name => {
      quizzes.push(<ListGroup.Item onClick={selectOption1}>
         <h3>{name}</h3>
      </ListGroup.Item>);
   });
*/
   

   return (
      <View>
         <h2>{className}</h2>
         <ListGroup>
            {quizzes}
         </ListGroup>
         <Button>
            Submit
         </Button>
      </View>
   );
}

export default ClassPage;