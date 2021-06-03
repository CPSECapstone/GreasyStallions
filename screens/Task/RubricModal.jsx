import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, Text, Button, Checkbox  } from 'react-native-paper';
import Modal from 'react-native-modal';

export default function RubricModal({show, setShow, reqs, taskProgress}) {
	// const [show, setShow] = useState(false)
	let reqComps = [];
	console.log(taskProgress)
	console.log(reqs)
	reqs.forEach((element, idx) => {
		console.log(element)
		reqComps.push(
		<Surface style={{paddingLeft: '10px', marginTop: '10px',
		 marginRight: '5px', marginLeft: '5px',
		 marginBottom: '10px'}}elevation={3}>
			 <Checkbox status={true ? 'checked' : 'unchecked'}/>
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
				<Button onPress={() =>setShow(false)}>
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