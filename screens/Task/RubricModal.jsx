import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, Text, Button, Checkbox  } from 'react-native-paper';
import Modal from 'react-native-modal';
import { SUBMIT_TASK_PROGRESS, SUBMIT_TASK } from './TaskQueries'
import { useMutation } from '@apollo/client';



export default function RubricModal({show, setShow, reqs, taskProgress, taskId}) {
	let reqComps = [];

	const [submitTaskProgess] = useMutation(SUBMIT_TASK_PROGRESS);
	const [submitTaskMutation] = useMutation(SUBMIT_TASK)
	const [completeIds, setCompleteIds] = useState(taskProgress ?  [...taskProgress.finishedRequirementIds] : [])
	
	function isComplete(reqId) {
		return completeIds.includes(reqId);
	}

	let completeReqPress = (reqId) => {
		if(completeIds.includes(reqId)){
			var newCompIds = completeIds.filter(id => id !== reqId)
			setCompleteIds(newCompIds);
			submitTaskProgess({
				variables: {
					id: taskId,
					finishedRequirements: newCompIds
				}
			});
		} else {
			setCompleteIds([...completeIds, reqId]);//this doesn't update immmediately
			submitTaskProgess({
				variables: {
					id: taskId,
					finishedRequirements: [...completeIds, reqId]
				}
			});
		}

	}
	let submitTask = () => {
		submitTaskMutation({
			variables: {
			  taskId: taskId
			}});
	}

	reqs.forEach((element, idx) => {
		console.log(element)
		reqComps.push(
		<Surface style={{paddingLeft: '10px', marginTop: '10px',
		 marginRight: '5px', marginLeft: '5px',
		 marginBottom: '10px'}}elevation={3}>
			 <Checkbox 
			  status={isComplete(element.id) ? 'checked' : 'unchecked'}
			  onPress={() => completeReqPress(element.id)}/>
			 <Text>{element.description}</Text>
		</Surface>);
  });


	const containerStyle = {backgroundColor: 'white', padding: 20};
	return (
		<Modal isVisible={show}>
			<Surface style={{margin:20}}>
				<View style={{"flex-direction": "row", flexWrap: "wrap"}}>
					<Title>Task Rubric</Title>
					<Button onPress={() =>setShow(false)}>
						{"Hide modal"}
					</Button>
				</View>
				{reqComps}
				<Button 
				 disabled={reqs.length !== completeIds.length}
				 onPress={submitTask}>
					{"Submit"}
				</Button>
			</Surface>
		</Modal>
	)
}

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