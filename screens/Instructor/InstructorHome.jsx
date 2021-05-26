import { Button, View,  StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client';
import {Typography, Grid, Box, Paper} from '@material-ui/core';
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

const Courses = ({navigation}) => {
	const {data, error, loading} = useQuery(LIST_COURSES);
	if (error) { console.log('Error fetching courses', error); }
  
  
	let courses = [];
	var goToClassPage = () => {
	  navigation.navigate('ClassPage', {className: "Test Class"})
	};
  
	if(data){
	  data.courseInfos.forEach( crs => {
		let toPush = 
		  <Surface style = {styles.surface} onClick = {() => {
			navigation.navigate('InstructorClassPage', 
			 {
			   className: crs.course,
			   teacher: true
			 })}}>
			  <Text>{crs.course}</Text>
		  </Surface>
		courses.push(toPush)
	  });
	}
	
  
	return (
	  <View style = {styles.section}>
		<Text>Courses</Text>
		<View>
			{courses}
		</View>
	  </View>
	);
  }





export default function InstructorHome() {

  return (
    <View style={styles.container}>
		<Courses/>
      	<Text style={styles.text}>instruct home</Text>
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
		padding: 8,
		height: 80,
		width: 80,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	  }
  });