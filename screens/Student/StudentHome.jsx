import React from 'react';
import {Button, View, Text, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Surface } from 'react-native-paper';
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
const LIST_TASKS = gql
`
   query{getTasks{name description}}
`;

const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;

export default function StudentHome() {
	const {data, error, loading} = useQuery(LIST_COURSES);
	let courses = [];


	if(loading)
		return (<View style={styles.container}>
					<Text style={styles.text}>Loading...</Text>
				</View>)

	if(error)
		return (<View style={styles.container}>
				<Text style={styles.text}>ERROR!!</Text>
			</View>)

	if(data){
		console.log(data)
		data.courseInfos.forEach( crs => {
			let toPush = 
				<Surface onClick={() => {navigation.navigate('ClassPage', {className: crs.course})}} 
				 style={{
					marginTop: 32,
					fontSize:18, 
					fontWeight:'bold', 
					justifyContent:'center', 
					backgroundColor: randomColor(), 
					display: 'flex', 
					alignItems: 'center', 
					width: 200, 
					height: 150
				 }} 
				 elevation={3}>
					<Text>{crs.course}</Text>
			</Surface>
			courses.push(toPush)
		});
	}


	return (
		<View style={styles.container}>
			<Text style={styles.text}>studhome</Text>
			{courses}
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
  });