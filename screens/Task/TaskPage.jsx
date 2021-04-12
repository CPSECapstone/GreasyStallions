import { Form, Button, FormLabel, ButtonGroup, ToggleButton } from 'react-bootstrap';
import React from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask'
import VideoTask from '.VideoTask'

let TaskPage = ({ navigation }) =>{
   const [showQuiz, setShowQuiz] = useState(false);
   const [showVideo, setShowVideo] = useState(false);

   const acvitity = [
      {
         num: 1,
         task_type: "video"
         text:"What is the capital of Sweden?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Stockholm"
      },
      {
         num: 2,
         task_type: "quiz"
         text:"What is the capital of Finland?",
         options: ["Helsinki", "Athens", "Stockholm", "Oslo", "Copenhagen"],
         answer: "Helsinki"
      },
      {
         num: 3,
         task_type: "hybrid"
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

   return (
      <View>
         <QuizTask
          show={showQuiz}/>
         <VideoTask/>
      </View>
   )
}