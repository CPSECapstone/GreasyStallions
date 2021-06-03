import React from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {ADD_MISSION, COURSE_CONTENT} from './CreateGQL';
import { DefaultTheme, TextInput, Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import Styles from '../../styles/styles';
import Colors from '../../styles/colors';
import { View, TouchableOpacity } from 'react-native';


//const [updateGoal] = useMutation(UPDATE_GOAL, {refetchQueries: [{query: LIST_ALL_GOALS}]});
//this modal uses MaterialUI Dialog to create a modal that is a form for an Instructor
//to create a Mission object, and is sent to our database
export default function CreateMission(course)  {
	const [visible, setVisible] = React.useState(false);
  	const [name, setName] = React.useState('');
  	const [desc, setDesc] = React.useState('');
	const [addMission, {data1, error1}] = useMutation(ADD_MISSION, {refetchQueries: [{query: COURSE_CONTENT, variables:{className: course.course}}]});

	//updates the mission name and description (below)
	//based on typed user input
    const handleNameChange = event => {
        setName(event.target.value);
    };
    
    const handleDescChange = event => {
        setDesc(event.target.value);
    };
	  

    function submit(){   
		console.log(course.course);
		console.log(name);
		console.log(desc);
		addMission({ 
			variables:{ 
				"course": course.course, 
				"name": name, 
				"description": desc 
			}   
		});
    }

	function handleSubmit(){
		submit();
		setVisible(false);
	}

	const theme = {
		...DefaultTheme,
		roundness: 2,
		colors: {
		  ...DefaultTheme.colors,
		  primary: Colors.fliptedColor,
		  accent: Colors.fliptedColor,
		},
	  };

    return (
        <View>
			<Button style = {{marginTop: 16, marginBottom: -8 , alignSelf: 'flex-end'}} color={Colors.fliptedColor}  labelStyle= {{color: Colors.fliptedColor}} icon="plus-circle" onPress = {() => setVisible(true)}>Add Mission</Button>
		{ (visible == true) &&  
			<View  style = {{alignItems: 'center'}}>
			<TextInput
				style={{width: '100%' ,maxWidth: 600, margin: 8}}	
					theme = {theme}
					outlineColor= {Colors.fliptedColor}
					underlineColor= {Colors.fliptedColor}
					selectionColor= {Colors.fliptedColor}
					label="Mission Name:"
					value={name}
					onChangeText={name => setName(name)}
			/>
			<TextInput
				style={{width: '100%', height: 150, maxWidth: 600, margin: 8}}
					theme = {theme}
					outlineColor= {Colors.fliptedColor}
					underlineColor= {Colors.fliptedColor}
					selectionColor= {Colors.fliptedColor}
					multiline
					label="Mission Description:"
					value={desc}
					onChangeText={desc => setDesc(desc)}
			/>
			<View style={{flexDirection: 'row', alignSelf: 'center'}}>
					<Button onPress = {() => setVisible(false)}>
						<Text>Cancel</Text>
					</Button>
					<Button onPress = {() => handleSubmit()} style={{backgroundColor: '#3467EC'}}>
						<Text style={{color: '#FFFFFF'}}>Submit</Text>
					</Button>
			</View>
		</View>}
		</View>
      );

}
