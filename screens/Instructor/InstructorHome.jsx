import { ScrollView, TouchableOpacity,  View,  Stylesheet } from 'react-native';
import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { Surface, Text, List, Divider,  Headline , Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import Amplify, { Auth } from 'aws-amplify';
import Styles from '../../styles/styles';
import CreateCourse from '../CreateModals/CreateCourse';
import {LIST_COURSES} from '../CreateModals/CreateGQL';

export default function InstructorHome({navigation}) {
	const {data, error, loading} = useQuery(LIST_COURSES);
	const [showModal, setShowModal] = React.useState(false);

	if (error) { console.log('Error fetching courses', error); }

	
  
	let courses = [];
	var goToClassPage = (courseName, instructor) => {
		navigation.navigate('InstructorClassPage', {className: courseName, teacher: instructor})
	};

  
	if(data){
	  data.courseInfos.forEach( crs => {
		let toPush = 
		<TouchableOpacity style = {Styles.coursebutton} onPress={() => goToClassPage(crs.course, crs.instructor)}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
				<Text style = {Styles.courseListText}>{crs.course}</Text>
				<Ionicons style = {Styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
			</View>
    		<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
		

		
		courses.push(toPush)
	  });
	}
	


	return (
		<ScrollView contentContainerStyle={Styles.container}>
			<CreateCourse/>
			{courses}
		</ScrollView>
	)
}
