import React from 'react';
import { View } from 'react-native';
import { Form, Button, FormLabel, ButtonGroup, ToggleButton, Container } from 'react-bootstrap';


/*
   Quiz format for showing all questions on a single screen with submit button and validation
*/

let QuizTask = function({ questions, options, answers }) {

   const [selectedAns, setSelectedAns] = React.useState([]);

   let updateAnswers = (i, e) => {
      let temp = [...selectedAns];
      temp[i] = e.currentTarget.value;
      setSelectedAns(temp);
   }

   return (
      <div>
         {questions.map((question, idx) => (
            <Form>
               {console.log(selectedAns)}
               <Form.Group controlId="question">
                  <FormLabel>{question}</FormLabel>
               </Form.Group>
               <Form.Group controlId="answers">
                  <ButtonGroup toggle>
                     {options[idx].map((option) => (
                        <ToggleButton
                         value={option}
                         type="radio"
                         variant="outline-dark"
                         name="radio"
                         onChange={(e) => updateAnswers(idx, e)}
                        >
                           {option}
                        </ToggleButton>
                     ))}
                  </ButtonGroup>
               </Form.Group>
            </Form>
         ))}
         <Button variant="success">Check Answers</Button>
      </div>
   );
}

export default QuizTask;