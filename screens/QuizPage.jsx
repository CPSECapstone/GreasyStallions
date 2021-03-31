import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Col, Row, Form, Button, FormLabel, FormControl, ListGroupItem, ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

let QuizPage = function({ navigation }){
   const [ques1, setQues1] = React.useState(null);
   const [ques2, setQues2] = React.useState(null);

   let out = "You scored a ";
   let score = 0;
   let answers = ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"]
   const radios = [
      {name : 'Helsinki', value: 'Helsinki'},
      {name : 'Athens', value: 'Athens'},
      {name : 'Stockholm', value: 'Stockholm'},
      {name : 'Oslo', value: 'Oslo'},
      {name : 'Copenhagen', value: 'Copenhagen'},
   ]
   let options = [];

   function submitClicked() {
      if (ques1 == "Stockholm") {
         score = score + 5;
      }
      if (ques2 == "Helsinki") {
         score = score + 5;
      }
      out = out + score.toString();
      out = out + "/10!!";
      alert(out);
   }

   answers.forEach(txt => {
      options.push(<ListGroup.Item>
         <Form.Check
          type="radio"
          label={txt}
          name={txt}
          id={txt}/>
         {/* <h2>{txt}</h2> */}
      </ListGroup.Item>);
   });

   
   return (
      <View>
         <Form>
            <h2>Quiz #1 Don't fail</h2>
            <Form.Group controlId="Q1">
               <FormLabel>1) What is the capital of Sweden?</FormLabel>
                  <br />
                  <ButtonGroup toggle>
                     {radios.map((radio, idx) => (
                        <ToggleButton
                           key={idx}
                           type="radio"
                           variant="outline-dark"
                           name="radio"
                           value={radio.value}
                           checked={ques1 === radio.value}
                           onChange ={(e) => setQues1(e.currentTarget.value)}
                        >
                           {radio.name}
                        </ToggleButton>
                     ))}
                  </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="Q2">
               <FormLabel>2) What is the capital of Finland?</FormLabel>
                  <br />
                  <ButtonGroup toggle>
                     {radios.map((radio, idx) => (
                        <ToggleButton
                           key={idx}
                           type="radio"
                           variant="outline-dark"
                           name="radio"
                           value={radio.value}
                           checked={ques2 === radio.value}
                           onChange ={(e) => setQues2(e.currentTarget.value)}
                        >
                           {radio.name}
                        </ToggleButton>
                     ))}
                  </ButtonGroup>
            </Form.Group>
            <Button as="input" type="button" Value="Submit" onClick={submitClicked}/>
         </Form>
      </View>
   );
}

export default QuizPage;