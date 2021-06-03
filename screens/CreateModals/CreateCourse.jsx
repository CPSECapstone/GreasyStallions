import React from 'react';
import { DefaultTheme, TextInput, Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import {useQuery, useMutation, gql} from '@apollo/client';
import { View, TouchableOpacity } from 'react-native';
import Styles from '../../styles/styles';
import Colors from '../../styles/colors';
import {LIST_COURSES, GET_USER, ADD_COURSE} from './CreateGQL';


//this modal uses MaterialUI Dialog to create a modal that is a form for an Instructor
//to create a Course object, and is sent to our database
export default function CreateCourse()  {
  	const [visible, setVisible] = React.useState(false);
  	const [name, setName] = React.useState('');
  	const [desc, setDesc] = React.useState('');
	const [addCourse, {data1, error1}] = useMutation(ADD_COURSE, {refetchQueries: [{query: LIST_COURSES}]});
	const {data, error, loading} = useQuery(GET_USER);
	if(error){console.log('error getting user')};

	const [newName, setNewName] = React.useState('');
	const [newDesc, setNewDesc] = React.useState('');


    function submit(){   
		//leaving instructor as Mr Butcher for now so it shows in the live demo
		// later we will change this to current user id or email** would be a good 
		// idea because they are the unique key
		addCourse({ 
			variables:{ 
				"course": name, 
				"instructor": "Mr. Butcher", 
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
			<Button color={Colors.fliptedColor}  labelStyle= {{color: Colors.fliptedColor}} icon="plus-circle" onPress = {() => setVisible(true)}>Add Course</Button>
		{ (visible == true) &&  
			<View  style = {{alignItems: 'center'}}>
			<TextInput
				style={{width: '100%' ,maxWidth: 600, margin: 8}}	
					theme = {theme}
					outlineColor= {Colors.fliptedColor}
					underlineColor= {Colors.fliptedColor}
					selectionColor= {Colors.fliptedColor}
					label="Course Name:"
					value={name}
					onChangeText={name => setName(name)}
			/>
			<TextInput
				style={{width: '100%', height: 150, maxWidth: 600, margin: 8, fontColor: '#000000'}}
					theme = {theme}
					outlineColor= {Colors.fliptedColor}
					underlineColor= {Colors.fliptedColor}
					selectionColor= {Colors.fliptedColor}
					multiline
					label="Course Description:"
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
		

	)

}