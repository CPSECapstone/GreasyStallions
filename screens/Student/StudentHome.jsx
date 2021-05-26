import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  /* Button */} from '@material-ui/core';
import { apolloClientFlipted} from '../../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Surface, Button } from 'react-native-paper';

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
        <Typography variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Hello, {email}
          </Box>
        </Typography>
      </View>
    );
  }

// const CrsFliptedComponent = ({navigation}) => {
//   const {data, error, loading} = useQuery(LIST_COURSES);
  
//   if (error) { console.log('Error fetching courses', error); }

//   let courses = [];

//   if(data){
//     data.courseInfos.forEach( crs => {
//       let toPush = 
//       <Paper onClick={() => {navigation.navigate('ClassPage', {className: crs.course})}} style={{marginTop: 32,fontSize:18, fontWeight:'bold', justifyContent:'center', backgroundColor: randomColor(), display: 'flex', alignItems: 'center', width: 200, height: 150}} elevation={3}>
//             {crs.course}
//         </Paper>
//       courses.push(toPush)
//     });
//   }

//   return (
//     <View style = {styles.section}>
//       <Typography variant="h5">
//           <Box fontWeight="fontWeightBold" m={1}>
//             Courses
//           </Box>
//         </Typography>
//         <Grid container direction="row" justify="space-around" alignItems="center">
//           {courses}
//         </Grid>
//     </View>
//   );
// }

export default function Home({ navigation, signOut }) {
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
      <Button onPress={() => navigation.navigate("GoalPage", {user: "STUDENT"})}>
        <Text>GOALS</Text>
      </Button>
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
