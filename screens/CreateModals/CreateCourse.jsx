import React from 'react';
import { TextInput, Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import {useQuery, useMutation, gql} from '@apollo/client';
import { View, TouchableOpacity } from 'react-native';

const GET_USER = gql
	`
		query{
			getUser{
			email
			}
		}
	`;

const ADD_COURSE = gql
	`
		mutation ($course: String!, $instructor: String!, $description: String!) {
			addCourse(
				course:{
					course: $course
					instructor: $instructor
					description: $description
				}
			)
		}
	`;

//this modal uses MaterialUI Dialog to create a modal that is a form for an Instructor
//to create a Course object, and is sent to our database
export default function CreateCourse()  {
  	const [visible, setVisible] = React.useState(false);
  	const [name, setName] = React.useState('');
  	const [desc, setDesc] = React.useState('');
	const [addCourse, {data1, error1}] = useMutation(ADD_COURSE);
	const {data, error, loading} = useQuery(GET_USER);
	if(error){console.log('error getting user')};

	const [newName, setNewName] = React.useState('');
	const [newDesc, setNewDesc] = React.useState('');


    function submit(){   
		let email = '';
		email = data.getUser.email;
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

	const Section = <View>
						<TextInput
							style={{maxWidth: 600, margin: 8, backgroundColor:'#d3d3d3', fontColor: '#000000'}}
								selectionColor= '#3467EC'
								label="Course Name:"
								value={newName}
								onChangeText={newName => setNewName(newName)}
						/>
						<TextInput
							style={{height: 150, maxWidth: 600, margin: 8, backgroundColor:'#d3d3d3', fontColor: '#000000'}}
								selectionColor= '#3467EC'
								multiline
								label="Course Description:"
								value={newDesc}
								onChangeText={newDesc => setNewDesc(newDesc)}
						/>
						<View style={{flexDirection: 'row', alignSelf: 'center'}}>
								<Button onPress = {() => setVisible(false)}>
									<Text>Cancel</Text>
								</Button>
								<Button style={{backgroundColor: '#3467EC'}}>
									<Text style={{color: '#FFFFFF'}}>Submit</Text>
								</Button>
						</View>
					</View>;

    return (	
		<View>
		{ (visible == true) &&  
			<View>
			<TextInput
				style={{maxWidth: 600, margin: 8, backgroundColor:'#d3d3d3', fontColor: '#000000'}}
					selectionColor= '#3467EC'
					label="Course Name:"
					value={newName}
					onChangeText={newName => setNewName(newName)}
			/>
			<TextInput
				style={{height: 150, maxWidth: 600, margin: 8, backgroundColor:'#d3d3d3', fontColor: '#000000'}}
					selectionColor= '#3467EC'
					multiline
					label="Course Description:"
					value={newDesc}
					onChangeText={newDesc => setNewDesc(newDesc)}
			/>
			<View style={{flexDirection: 'row', alignSelf: 'center'}}>
					<Button onPress = {() => setVisible(false)}>
						<Text>Cancel</Text>
					</Button>
					<Button style={{backgroundColor: '#3467EC'}}>
						<Text style={{color: '#FFFFFF'}}>Submit</Text>
					</Button>
			</View>
		</View>}
		</View>
		

	)

}