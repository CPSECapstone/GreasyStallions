import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';

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
	var goToClassPage = () => {
	  navigation.navigate('ClassPage', {className: "Test Class"})
	};
  
	if(data){
	  data.courseInfos.forEach( crs => {
		let toPush = 
		  <TouchableOpacity 
		  	style = {styles.coursebutton}
			onPress = {() => {
				navigation.navigate('InstructorClassPage', 
				{
				className: crs.course,
				teacher: true
				})}}>
				<Text style={{color: "#FFFFFF"}}>{crs.course}</Text>
			</TouchableOpacity>
		courses.push(toPush)
	  });
	}

	return (
		<View style={styles.container}>
			<Text style={{marginBottom: 32, marginTop: 32}}>Courses</Text>
			<ScrollView>
				{courses}
			</ScrollView>
		</View>
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
	surface: {
		marginTop: 16,
		padding: 8,
		height: 100,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	  },
	  item: {
		flex: 1,
		height: 160,
		margin: 1
	  },
	  list: {
		flex: 1
	  },
	  coursebutton: {
		marginTop: 16,
		padding: 8,
		height: 100,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3467EC'
	  }
  });