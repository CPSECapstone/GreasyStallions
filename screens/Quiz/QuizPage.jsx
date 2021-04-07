import React from 'react';
import { View } from 'react-native';
import { Form, Button, FormLabel, ButtonGroup, ToggleButton } from 'react-bootstrap';
import QuizModal from './QuizModal.jsx';

let QuizPage = function({ navigation }){

   const quiz = [
      {
         num: 1,
         text:"What is the capital of Sweden?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Stockholm"
      },
      {
         num: 2,
         text:"What is the capital of Finland?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Helsinki"
      },
      {
         num: 3,
         text:"What is the capital of Denmark?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Copenhagen"
      },
      {
         num: 4,
         text:"What is the capital of Norway?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Oslo"
      }
   ];

   const [currNum, setCurrNum] = React.useState(0);
   const [answerSet, setAnswerSet] = React.useState([]);
   const [showModal, setShowModal] = React.useState(false);


   function changeCurrNum(type) {
      if (type === "+") {
         if  (currNum < quiz.length - 1) {
            setCurrNum(currNum + 1);
         } else {
            setShowModal(true);
         }
      }

      if (type === "-" && currNum != 0) {
         setCurrNum(currNum - 1);
      }
   }

   let updateAnswers = (e) => {
      let tempAnswers = [...answerSet];
      tempAnswers[currNum] = e.currentTarget.value;
      setAnswerSet(tempAnswers);
   }

   let valid = () => {
      return answerSet.length === quiz.length;
   }

   let submitClicked = () => {
      setShowModal(false);
      
      navigation.navigate('QuizResults', {
         quiz: quiz,
         answers: answerSet
      });
   }
   
   return (
      <View>
         <Form>
            <h2>Quiz #1 European Capitals </h2>
            <Form.Group controlId="currQ">
               {console.log(answerSet)}
               <FormLabel>{quiz[currNum].num + ") " + quiz[currNum].text}</FormLabel>
            </Form.Group>
            <Form.Group controlId="answers">
               <ButtonGroup toggle>
                  {quiz[currNum].options.map((option, idx) => (
                     <ToggleButton
                        key={idx}
                        value={option}
                        type="radio"
                        variant="outline-dark"
                        name="radio"
                        onChange = {updateAnswers}
                     >
                        {option}
                     </ToggleButton>
                  ))}
               </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="prevandnext">
               <ButtonGroup size="lg" classname="navbuts">
                  <Button variant="primary" onClick={() => changeCurrNum("-")}>Prev</Button>
                  {console.log("quiz.length " + quiz.length)}
                  {console.log("answer.length " + answerSet.length)}
                  {console.log()}
                  {(currNum === (quiz.length - 1)) ? 
                  <Button disabled={!valid()} variant="primary" onClick={() => changeCurrNum("+")}>
                     Submit
                  </Button> : 
                  <Button variant="primary" onClick={() => changeCurrNum("+")}>
                     Next
                  </Button>}
               </ButtonGroup>
            </Form.Group>
         </Form>
         <QuizModal show={showModal} close={() => setShowModal(false)} save={() => submitClicked()} />
      </View>
   );
}

export default QuizPage;