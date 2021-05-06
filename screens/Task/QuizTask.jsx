   import React from 'react';
   import { View } from 'react-native';
   import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Typography } from '@material-ui/core';
   import { Pagination } from '@material-ui/lab';


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

      options[currQues - 1].forEach(element => {
         {console.log(element)}
         questionOpts.push(<FormControlLabel value={element} control={<Radio />} label={element}/>)
      });
      
      const handlePaginationChange = (event, value) => {
         setCurrQues(value);
      };

      const handleAnsChange = (event) => {
         setValue(event.target.value);
      };

      return (
         <div>
            <Typography variant="h2" component="h2">{title}</Typography>
            <Pagination count={questions.length} page={currQues}
             onChange={handlePaginationChange}/>
            <FormControl component="fieldset">
               <FormLabel component="legend">{questions[currQues - 1]}</FormLabel>
               <RadioGroup aria-label="ques" value={value} onChange={handleAnsChange}>
                  {questionOpts}
               </RadioGroup>
            </FormControl>
         </div>
      );
   }

   export default QuizTask;