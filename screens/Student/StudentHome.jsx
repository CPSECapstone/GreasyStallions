import React from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, Text, Surface, List, ListItem, Button } from 'react-native-paper';
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

const UserInfo = () => {
	//not really accurate because this page is using the old Apollo Client/queries
	const {data, error, loading} = useQuery(USER_ROLE);
	if (error) { console.log('Error fetching user', error); }
	let role = '';
	let email = '';
	if(data){
		email = data.getUser.email;
		role = data.getUser.role;
	}

	return (
		<View style = {styles.section}>
			<Text style={styles.header}>
				Hello, {email}
			</Text>
		</View>
	);
}

const CrsFliptedComponent = ({navigation}) => {
	const {data, error, loading} = useQuery(LIST_COURSES);
	if (error) { console.log('Error fetching courses', error); }

	let courses = [];

	if(data){
		data.courseInfos.forEach( crs => {
			let toPush = 
			<TouchableOpacity style = {styles.coursebutton} onPress={() => 
				{navigation.navigate('ClassPage', {className: crs.course})}}>
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
		<View style = {styles.section}>
			{courses}
		</View>
	);
}

export default function Home({ navigation, signOut }) {
	return (
		<ScrollView style={styles.container}>
			<UserInfo></UserInfo>
			<CrsFliptedComponent navigation={navigation}/>
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
	header: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginLeft: 32, 
		marginTop: 32,
		marginBottom: 32
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