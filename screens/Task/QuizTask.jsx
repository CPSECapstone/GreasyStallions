import React from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { Surface, RadioButton, Subheading, DataTable } from 'react-native-paper'

let QuizTask = function ({ title, questions, options, answers }) {

   const [selectedAns, setSelectedAns] = React.useState([]);
   const [currQues, setCurrQues] = React.useState(0);
   const [value, setValue] = React.useState(); // curr answer
   let questionOpts = [];

   let updateAnswers = (newValue, idx) => {
      let temp = [...selectedAns];
      temp[idx] = newValue;
		setValue(newValue)
      setSelectedAns(temp);
   };

  
   const handlePaginationChange = (event, value) => {
      setCurrQues(value);
   };

   const handleAnsChange = (event) => {
      setValue(event.target.value);
   };

   let show;
   // determine if a question is free response or multiple choice
   // and return the correct display type
   const frormc = () => {
      if (questions[currQues].__typename === "McQuestion") {
         questions[currQues].options.forEach(element => {
            questionOpts.push(
					<View style={{"flex-direction": "row", flexWrap: "wrap"}}>
						<RadioButton value={element.description}/>
						<Text>{element.description}</Text>
					</View>)
         });

         show = <>
						<Subheading>
							{questions[currQues].description}
						</Subheading>
						<RadioButton.Group  aria-label="ques" value={value} onValueChange={newValue => updateAnswers(newValue, currQues)}>
							{questionOpts}
						</RadioButton.Group >
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
				fullWidth
				multiline
				rows={6}/>
			</>
      }
   }

   return (
      <View>
         <Surface style={{padding: '10px'}} elevation={3}>
            <Subheading class="componentHeader" variant="h4" component="h4">{title}</Subheading>
				<DataTable>
					{questions.length !== 1 && 
					 <DataTable.Pagination
					 page={currQues}
					 numberOfPages={questions.length}
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