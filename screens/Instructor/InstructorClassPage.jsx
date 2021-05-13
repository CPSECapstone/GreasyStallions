import React, { useState } from 'react';
import { View } from 'react-native';
import "./InstructorHome.css";
import StudentGridComponent from './StudentGrid';
import {Typography, Box, Grid, Button, Paper} from '@material-ui/core';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import CreateMission from '../CreateModals/CreateMission';
import randomColor from 'randomcolor';


function getMissions(courseName, navigation){

  const COURSE_CONTENT = gql 
   `
	query {
		courseContent(course: "${courseName}") {
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

	//get and style Missions
  const {data, error, loading} = useQuery(COURSE_CONTENT);
	if (error) { console.log('Error fetching courses', error); }
	let missions = [];
	let description = '';
	let instructor = '';
  //let userType = teacher ? "teacher" : "student";
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
  return {missions, description, instructor};
}

  // The landing page for a teacher when they click into a course
  // from their home page
  export default function InstructorClassPage ({route, navigation}) {
    const { className, teacher } = route.params; //change to instructor
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState([]); //use React
    let response = getMissions(className, navigation);
    let missions = response.missions;
    let instructor = response.instructor;
    let description = response.description;

  return (
    <View class="section">
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
		  	<CreateMission course = {className}/>
            Missions
          </Box>
      </Typography>
		  <Grid style={{padding:16, marginTop: 32, marginLeft: 32}} container direction="row" justify="left" alignItems="center">
          {missions}
      </Grid>
      <Button 
      style={{margin: "1%"}}
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('MasteryOverviewPage', {className: className})}}>
         Mastery
      </Button>
        <Button 
        style={{margin: "1%"}}
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('GoalPage', {user: teacher})}}>
         Goal Page
      </Button>
      <StudentGridComponent
        students={students}
        setStudents={setStudents}
        navigation={navigation}
        filter={bubbleGridSelect}
        setFilter={setSelect}/>
    </View>
  );
}