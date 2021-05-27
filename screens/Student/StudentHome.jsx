import React from 'react';
import { ScrollView, TouchableOpacity,Button, View, Text, StyleSheet } from 'react-native';
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

export default function StudentHome({navigation}) {
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
		data.courseInfos.forEach( crs => {
		 let toPush = 
			<TouchableOpacity 
				style = {styles.coursebutton}
			 onPress = {() => {
				 navigation.navigate('ClassPage', 
				 {
				 	className: crs.course,
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
});