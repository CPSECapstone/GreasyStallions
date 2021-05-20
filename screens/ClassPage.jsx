import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import {Typography, ButtonGroup, Grid, Box, Paper, Link, List, ListItem, ListItemText,  Button, Breadcrumbs} from '@material-ui/core';
import randomColor from 'randomcolor';
import CreateMission from './CreateModals/CreateMission';
import MissionsView from '../screens/Mission/MissionsView';
import LearningTaskVisualization from '../screens/Student/LearningTargets/LearningTaskVisualization';
import './ClassPage.css';
import { useQuery, gql} from '@apollo/client';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  Button} from '@material-ui/core';
import randomColor from 'randomcolor';

let ClassPage = function({ route, navigation }){
   const { className, teacher } = route.params;
   const [curr, setCurr] = React.useState(0);
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

<<<<<<< HEAD
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
			<Button style={{ width: "150px" }} 
			color="primary" variant="contained"
			onClick={() => {navigation.navigate('GoalPage', {user: userType})}}>
			Goal Page
			</Button>
          </Box>
        </Typography>
		<Typography style={{marginLeft:24, marginTop:18}} variant="h4">
          <Box fontWeight="fontWeightBold" m={1}>
			Missions
		    <CreateMission course = {className}/>
          </Box>
        </Typography>
		 <Grid style={{padding:16, marginTop: 32, marginLeft: 32}} container direction="row" justify="left" alignItems="center">
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
=======
	let displayCurr = () => {
		if (curr === 0) {
			return <MissionsView className={className}/>
		} else if (curr === 1) {
			return <LearningTaskVisualization className={className}/>
		}
	}

	return (
    	<View>
			<Breadcrumbs class="trail" aria-label="breadcrumb">
				<Link color="textPrimary" onClick={() => navigation.navigate("StudentHome")}>
					Course
				</Link>
				<Link color="textPrimary" onClick={() => navigation.navigate("StudentHome")}>
					{className}
				</Link>
				<Link>
					{(curr === 0) ? "Missions Progress Visualization" : "Learning Task Visualization"}
				</Link>
			</Breadcrumbs>
			<Grid classes={{root: "header"}} container spacing={0}>
				<Grid item xs={5}>
					<Typography class="titleText" variant="h3" component="h3">
						{(curr === 0) ? "Missions Progress" : "Mastery Progress"}
					</Typography>
				</Grid>
				<Grid item xs={4}/>
				<Grid item xs={2}>
					<ButtonGroup color="primary" variant="contained">
						<Button onClick={() => setCurr(0)}>
							<Typography>Missions</Typography>
						</Button>
						<Button onClick={() => setCurr(1)}>
							<Typography>Learning Targets</Typography>
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
			<div class="blueline"/>
			{displayCurr()}
		 	<Grid style={{padding:16, marginTop: 32, marginLeft: 32}} container direction="row" justify="left" alignItems="center">
          		{missions}
        	</Grid>
>>>>>>> c8c2bdecb89f7ec462c37bf6825dd9748ef015e9
      </View>
   );
}

export default ClassPage;