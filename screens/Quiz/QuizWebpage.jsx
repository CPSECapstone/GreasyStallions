import React, {Component} from 'react';
import {WebView} from 'react-native-web-webview';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {ListGroup, Col, Row, Form, Button, FormLabel, FormControl, ListGroupItem, ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

let QuizWebpage = function({ navigation }){
   const [ques1, setQues1] = React.useState(null);
   const [ques2, setQues2] = React.useState(null);
   const [ques3, setQues3] = React.useState(null);
   const [ques4, setQues4] = React.useState(null);

   let out = "You scored a ";
   let score = 0;
   const radios = [
      {name : 'Helsinki', value: 'Helsinki'},
      {name : 'Athens', value: 'Athens'},
      {name : 'Stockholm', value: 'Stockholm'},
      {name : 'Oslo', value: 'Oslo'},
      {name : 'Copenhagen', value: 'Copenhagen'},
   ]

   function submitClicked() {
      if (ques1 == "Stockholm") {
         score = score + 5;
      }
      if (ques2 == "Helsinki") {
         score = score + 5;
      }
      if (ques3 == "Copenhagen") {
         score = score + 5;
      }
      if (ques4 == "Oslo") {
         score = score + 5;
      }
      out = out + score.toString();
      out = out + "/20!!";
      alert(out);
      out = "You scored a ";
      score = 0;
   }

   return (
      <ScrollView>
         <Form>
            <h2>Quiz #3 Read this</h2>
            <WebView
               source={{ uri: 'https://en.wikipedia.org/wiki/Earth' }}
               style={{ marginTop: 40 }} 
            />
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
            <Form.Group controlId="Q3">
               <FormLabel>3) What is the capital of Denmark?</FormLabel>
                  <br />
                  <ButtonGroup toggle>
                     {radios.map((radio, idx) => (
                        <ToggleButton
                           key={idx}
                           type="radio"
                           variant="outline-dark"
                           name="radio"
                           value={radio.value}
                           checked={ques3 === radio.value}
                           onChange ={(e) => setQues3(e.currentTarget.value)}
                        >
                           {radio.name}
                        </ToggleButton>
                     ))}
                  </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="Q4">
               <FormLabel>4) What is the capital of Norway?</FormLabel>
                  <br />
                  <ButtonGroup toggle>
                     {radios.map((radio, idx) => (
                        <ToggleButton
                           key={idx}
                           type="radio"
                           variant="outline-dark"
                           name="radio"
                           value={radio.value}
                           checked={ques4 === radio.value}
                           onChange ={(e) => setQues4(e.currentTarget.value)}
                        >
                           {radio.name}
                        </ToggleButton>
                     ))}
                  </ButtonGroup>
            </Form.Group>
            <Button as="input" type="button" Value="Submit" onClick={submitClicked}/>
         </Form>
      </ScrollView>
   );
}

export default QuizWebpage;
