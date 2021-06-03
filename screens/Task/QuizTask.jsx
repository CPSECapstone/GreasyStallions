import React from 'react';
import { Button, Platform, View, Text, StyleSheet, TextInput } from 'react-native';
import { Surface, RadioButton, Subheading, Title,  DataTable } from 'react-native-paper'
import Styles from '../../styles/styles';
import Color from '../../styles/colors';
import { SAVE_FRQUESTION, SAVE_MCQUESTION, GET_TASK_BY_ID} from './TaskQueries'
import {useMutation} from '@apollo/client';


let QuizTask = function ({ block, taskId, blockKey, quesProg}) {
	const refreshQuery = {refetchQueries: [{query: GET_TASK_BY_ID, variables: {id: taskId}}]}
	let { title, questions, options, answers } = block
	const [currQues, setCurrQues] = React.useState(0);
	let pullAnsr = [];
	questions.forEach(q => pullAnsr.push(quesProg.length ? quesProg.answers.find(elm => q.id === elm.questionId).answer : null));
   const [selectedAns, setSelectedAns] = React.useState(pullAnsr);
   const [value, setValue] = React.useState(pullAnsr ? 
		(questions[currQues].__typename === "McQuestion" ? 
		(pullAnsr[currQues] ? questions[currQues].options[pullAnsr[currQues]].description : undefined) : pullAnsr.answer): undefined); // curr answer
	const [saveFRQuestion] = useMutation(SAVE_FRQUESTION, refreshQuery);
	const [saveMCQuestion] = useMutation(SAVE_MCQUESTION, refreshQuery);

   let questionOpts = [];

	let updateAnswers = (newValue, idx) => {
      let temp = [...selectedAns];
      temp[idx] = newValue;
		setValue(newValue)
      setSelectedAns(temp);
   };


   const mcAnserChangeHandler = (questionId, answer, options) => {
		let picked = options.find(opt => opt.description === answer)
		saveMCQuestion(
			{
				variables: {
					taskId: taskId,
					blockId: blockKey.toString(),
					questionId: questionId.toString(),
					answerId: picked.id,
				}
			});
   };

	const frAnserChangeHandler = (questionId, answer) => {
		saveFRQuestion(
			{
				variables: {
					taskId: taskId,
					blockId: blockKey.toString(),
					questionId: questionId.toString(),
					answer: answer,
				}
			});
   };

   let show;
   // determine if a question is free response or multiple choice
   // and return the correct display type
   const frormc = () => {
      if (questions[currQues].__typename === "McQuestion") {
         questions[currQues].options.forEach(element => {
				if(Platform.OS === 'ios'  || Platform.OS === 'android') {
					questionOpts.push(
						<View>
							<Text>{element.description}</Text>
							<RadioButton value={element.description}/>
						</View>)
				} else {
					questionOpts.push(
						<View style={{"flex-direction": "row"}}>
							<RadioButton value={element.description}/>
							<Text>{element.description}</Text>
						</View>)
				}
         });
         show = <>
						<Subheading>
							{questions[currQues].description}
						</Subheading>
						<RadioButton.Group  
						 aria-label="ques" value={value} 
						 onValueChange={newValue => {
							 updateAnswers(newValue, currQues)
							 mcAnserChangeHandler(
								 questions[currQues].id, 
								 newValue,
								 questions[currQues].options)}}>
							{questionOpts}
						</RadioButton.Group>
					</>
      } else if (questions[currQues].__typename === "FrQuestion") {
         show = <>
				<Subheading>
					{questions[currQues].description}
				</Subheading>
				<TextInput
				 label={questions[currQues].description}
				 variant="outlined"
				 onChangeText={text => setValue(text)}
				 value={value}
				 numberOfLines={4}
				 onBlur={() => frAnserChangeHandler(questions[currQues].id, value)}
				 fullWidth
				 multiline
				 rows={6}/>
			</>
      }
   }

   return (
      <View style={Styles.taskContainer}>
         <Surface style={{padding: 10, backgroundColor: Color.light_gray }} elevation={3}>
            <Title style={Styles.taskTitleText}>{title}</Title>
				<DataTable>
					{questions.length !== 1 && 
					 <DataTable.Pagination
					 page={currQues}
					 numberOfPages={questions.length}
					 style={{backgroundColor: Color.light_gray}}
					 onPageChange={page => {
						setCurrQues(page)
						setValue(selectedAns[page] || undefined)
						}}
					 label={`${currQues + 1} of ${questions.length}`}
					 showFastPaginationControls
					 numberOfItemsPerPage={1}
				  />}
					{frormc()}
					{show}
				</DataTable>
         </Surface>
      </View>
   );
}

export default QuizTask

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  textAlign: 'center'
	},
  });