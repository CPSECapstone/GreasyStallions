import React from 'react';
import { View } from 'react-native';
import { Form, Button, FormLabel } from 'react-bootstrap';


/*
   Quiz format for showing all questions on a single screen with submit button and validation
*/

let QuizTask = function({ title, questions, options, answers }) {

   const [selectedAns, setSelectedAns] = React.useState([]);

   let updateAnswers = (i, e) => {
      let temp = [...selectedAns];
      temp[i] = e.currentTarget.value;
      setSelectedAns(temp);
   }

   return (
      <div>
         <h2>{title}</h2>
         {questions.map((question, idx) => (
            <Form>
               <Form.Group controlId="question">
                  <FormLabel>{question}</FormLabel>
               </Form.Group>
               <fieldset>
                  <Form.Group controlId="answers">
                     <Form.Label as="legend"/>
                     {options[idx].map((option, index) => (
                        <Form.Check
                         type="radio"
                         name="formradio"
                         id={index}
                         label={option}
                         value={option}
                         onChange={(e) => updateAnswers(idx, e)}
                        />
                     ))}
                  </Form.Group>
               </fieldset>
            </Form>
         ))}
         <Button variant="success">Check Answers</Button>
      </div>
   );
}

export default QuizTask;