import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoalListStudent from './Goals/GoalListStudent';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  Button} from '@material-ui/core';
import randomColor from 'randomcolor';


let ClassPage = function({ route, navigation }){
   const { className, teacher } = route.params;
   const COURSE_CONTENT = gql 
   `
	query {
		courseContent(course: "${className}") {
			courseInfo {
				instructor description course
			}
			missions {
				name
				id
			}
			targets {
				targetName
			}
		}
	}
   `;


   	const getTasks = () => {
		
		const TASKS = gql 
		`
		query{
		 tasksByCourse(course: "${className}"){
		   id name missionId
		 }
	   }
		`;
		//get and style Tasks
		const {data, error, loading} = useQuery(TASKS);
		if (error) { console.log('Error fetching courses', error); }
		let tasks = [];
		if(data){
			data.tasksByCourse.forEach( task => {
			let toPush = 
			<Paper style={{margin: "4px",fontSize:18, fontWeight:'bold', justifyContent:'center', backgroundColor: 'light-grey', 
			 display: 'flex', alignItems: 'center', width: 225, height: 75}}
			 elevation={3} onClick={() => navigation.navigate("TaskPage", {id: task.id})}>
				{task.name}
			</Paper>;
			tasks.push(toPush);
			});
		}
		tasks.push(<Paper style={{fontSize:18, fontWeight:'bold', justifyContent:'center', backgroundColor: 'light-grey', 
		 display: 'flex', alignItems: 'center', width: 200, height: 75}}
		 elevation={3} onClick={() => navigation.navigate("TaskPage", {id: "90e0c730e56"})}>
		 TESTING TASK
	     </Paper>);
		return tasks;
	}

	//later: put missions and tasks into separate functions
	//get and style Missions
   const {data, error, loading} = useQuery(COURSE_CONTENT);
	if (error) { console.log('Error fetching courses', error); }
	let missions = [];
	let description = '';
	let instructor = '';
   let userType = teacher ? "teacher" : "student";
	if(data){
		data.courseContent.missions.forEach( mission => {
		let toPush = 
		 <Paper style={{fontSize:18, fontWeight:'bold', justifyContent:'center', backgroundColor: randomColor(), 
		  display: 'flex', alignItems: 'center', width: 200, height: 150}} elevation={3}
		  onClick={() => navigation.navigate("MissionPage", {id: mission.id})}>
			{mission.name}
		 </Paper>
		missions.push(toPush)
		});
		
		description = data.courseContent.courseInfo.description;
		instructor = data.courseContent.courseInfo.instructor;
	}

	let tasks = [];
	tasks = getTasks();


   return (
      <View>
         <Typography align='center' variant="h4">
          <Box style={{marginLeft: 24, marginTop: 24}}fontWeight="fontWeightBold" m={1}>
            {className}
          </Box>
        </Typography>
		<Typography align='center' variant="h5">
          <Box style={{marginLeft: 24, marginTop: 8}}fontWeight="fontWeightBold" m={1}>
            {instructor}
          </Box>
        </Typography>
		<Typography align='center' variant="h7">
          <Box style={{marginLeft: 24, marginTop: 8}}fontWeight="fontWeightBold" m={1}>
            {description}
          </Box>
        </Typography>
		<Typography style={{marginLeft:24, marginTop:36}} variant="h4">
          <Box fontWeight="fontWeightBold" m={1}>
            Missions
          </Box>
        </Typography>
		 <Grid style={{padding:16, marginTop: 32, marginLeft: 32}}container direction="row" justify="left" alignItems="center">
          {missions}
        </Grid>
		<Typography style={{marginLeft:24, marginTop:36}} variant="h4">
          <Box fontWeight="fontWeightBold" m={1}>
            Tasks
          </Box>
        </Typography>
		<Grid style={{padding:16, marginTop: 32, marginLeft: 32}}container 
		 direction="row" justify="left" alignItems="center">
          {tasks}
        </Grid>
      <Button 
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('GoalPage', {user: userType})}}>
         Goal Page
      </Button>
      </View>
   );
}

export default ClassPage;