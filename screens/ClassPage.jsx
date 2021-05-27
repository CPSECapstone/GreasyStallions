import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import {Typography, ButtonGroup, Grid, Box, Paper, Link, List, ListItem, ListItemText,  Button, Breadcrumbs} from '@material-ui/core';
import randomColor from 'randomcolor';
import CreateMission from './CreateModals/CreateMission';
import MissionsView from '../screens/Mission/MissionsView';
import LearningTaskVisualization from '../screens/Student/LearningTargets/LearningTaskVisualization';
import './ClassPage.css';




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
      </View>
   );
}

export default ClassPage;