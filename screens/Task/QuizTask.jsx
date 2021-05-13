   import React from 'react';
   import { View } from 'react-native';
   import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Typography, Paper } from '@material-ui/core';
   import { Pagination } from '@material-ui/lab';
   import './TaskPage.css';


   /*
      Quiz format for showing all questions on a single screen with submit button and validation
   */

   let QuizTask = function ({ title, questions, options, answers }) {

      const [selectedAns, setSelectedAns] = React.useState([]);
      const [currQues, setCurrQues] = React.useState(1);
      const [value, setValue] = React.useState(); // curr answer
      let questionOpts = [];

      let updateAnswers = (i, e) => {
         let temp = [...selectedAns];
         temp[i] = e.currentTarget.value;
         setSelectedAns(temp);
      };

      questions[currQues - 1].options.forEach(element => {
         questionOpts.push(<FormControlLabel value={element.description} control={<Radio />} label={element.description}/>)
      });
      
      const handlePaginationChange = (event, value) => {
         setCurrQues(value);
      };

      const handleAnsChange = (event) => {
         setValue(event.target.value);
      };

      return (
         <div>
            <Paper style={{padding: '7%'}} elevation={3}>
               <Typography class="componentHeader" variant="h4" component="h4">
                  {title}
               </Typography>
               {questions.length === 1 ? <div/> : <Pagination count={questions.length} page={currQues}
               onChange={handlePaginationChange}/>}
               <FormControl component="fieldset">
                  <FormLabel component="legend">
                     {questions[currQues - 1].description}
                  </FormLabel>
                  <RadioGroup aria-label="ques" value={value} onChange={handleAnsChange}>
                     {questionOpts}
                  </RadioGroup>
               </FormControl>
            </Paper>
         </div>
      );
   }

   export default QuizTask;