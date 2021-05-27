import React from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, List, ListItem, Button } from 'react-native-paper';
// need a replacement for grid, box, ListItemText
// scrollview for grid
// using Text and Button from react-native-paper

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
			<Text style={{marginBottom: 32, marginTop: 32}}>
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
			  <TouchableOpacity 
				style={styles.coursebutton}
				onPress={ () => 
					{navigation.navigate('ClassPage', {className: crs.course})}
				}>
				<Text style={{color: "#FFFFFF"}}>
					{crs.course}
				</Text>
			</TouchableOpacity>
		courses.push(toPush)
		});
	}

	return (
		<View style = {styles.section}>
			<Text style={{marginBottom: 32, marginTop: 32}}>
				Courses
			</Text>
			<ScrollView>
				{courses}
			</ScrollView>
		</View>
	);
}

export default function Home({ navigation, signOut }) {
	return (
		<View style={styles.section}>
			<UserInfo></UserInfo>
			<CrsFliptedComponent navigation={navigation}/>
		</View>
	)
}

const styles = StyleSheet.create({
  section: {
	padding:16,
  },
  header: {
	marginLeft: 50,
	flex: 1,
	width: "100%",
	alignSelf: 'center'
  },
  text: {
	textAlign: 'left',
	fontSize: 28,
	paddingTop: 20
  },
  buttons: {
	width: 100,
	backgroundColor: '#99004d',
	marginTop: 20
  },
  buttonText: {
	width: "15%",
	marginLeft: 0,
	alignSelf: 'center'
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