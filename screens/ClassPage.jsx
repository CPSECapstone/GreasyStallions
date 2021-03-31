import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Button, Col, Row} from 'react-bootstrap'

let ClassPage = function({ navigation }){

   let names = ["beep", "boop", "bop"];
   let quizzes = [];

   let selectOption = () => {
      navigation.navigate('QuizPage');
   };


   names.forEach(name => {
      quizzes.push(<ListGroup.Item onClick={selectOption}>
         <h3>{name}</h3>
      </ListGroup.Item>);
   });

   

   return (
      <View>
         <h2>Hellow</h2>
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