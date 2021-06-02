import { ScrollView, TouchableOpacity,  View,  StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { Surface, Text, List, Divider,  Headline , Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ArrowLeftOutlined } from '@material-ui/icons';
import {Ionicons} from '@expo/vector-icons';


const LIST_COURSES = gql
`
query GetCourseInfos {
	courseInfos(instructor: "Mr. Butcher") {
	courseId
	course
	description
	instructor
	}
}
`;

export default function InstructorHome({navigation}) {
	const {data, error, loading} = useQuery(LIST_COURSES);
	if (error) { console.log('Error fetching courses', error); }
  
  
	let courses = [];
	var goToClassPage = (courseName, instructor) => {
		navigation.navigate('InstructorClassPage', {className: courseName, teacher: instructor})
	};
  
	if(data){
	  data.courseInfos.forEach( crs => {
		let toPush = 
		<TouchableOpacity style = {styles.coursebutton} onPress={() => goToClassPage(crs.course, crs.instructor)}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
				<Text style = {styles.text}>{crs.course}</Text>
				<Ionicons style = {styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
			</View>
    		<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
		

		
		courses.push(toPush)
	  });
	}

	return (
		<ScrollView style={styles.container}>
			{courses}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  width: '100%',
	  marginTop: 12,
	  marginBottom: 32
	},
	text: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 24
	},
	carrot: {
		marginRight: 32
	},
	  coursebutton: {
		height: 75,
		width: '80%',
		justifyContent: 'center',
		alignSelf: 'flex-end'	
	}
  });