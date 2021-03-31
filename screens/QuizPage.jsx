import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Col, Row, Form, Button} from 'react-bootstrap'

let QuizPage = function({ navigation }){
   const [answer, setAnswer] = React.useState(null);


   let optionsTxt = ["yes", "no"];
   let options = [];


   optionsTxt.forEach(txt => {
      options.push(<ListGroup.Item onClick>
         <Form.Check
          type="radio"
          label={txt}
          name={txt}
          id={txt}/>
      </ListGroup.Item>);
   });

   
   

   return (
      <View>
         <h2>Q1: did the chicken eat the egg</h2>
         <Form.Group>
            <ListGroup>
               {options}
            </ListGroup>
            <Button type="Submit">
               Submit
            </Button>
         </Form.Group>
      </View>
   );
}

export default QuizPage;