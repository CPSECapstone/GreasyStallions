import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {Typography, Grid, Box, Paper} from '@material-ui/core';
import randomColor from 'randomcolor';
import CreateCourse from '../CreateModals/CreateCourse';

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

const LIST_STUDENTS = gql
`
query {progressByCourse(course: "Integrated Science") {userName progress {taskId status}}}
`;

const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;

const CrsFliptedComponent = ({navigation}) => {
  const {data, error, loading} = useQuery(LIST_COURSES);
  if (error) { console.log('Error fetching courses', error); }


  let courses = [];
  var goToClassPage = () => {
    navigation.navigate('ClassPage', {className: "Test Class"})
  };

  if(data){
    data.courseInfos.forEach( crs => {
      let toPush = 
        <Paper onClick={() => {
         navigation.navigate('InstructorClassPage', 
          {
            className: crs.course,
            teacher: true
          })}}
           style={
            {
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
            {crs.course}
        </Paper>
      courses.push(toPush)
    });
  }
  

  return (
    <View style = {styles.section}>
      <Typography variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Courses
          </Box>
        </Typography>
        <Grid container direction="row" justify="space-around" alignItems="center">
          {courses}
        </Grid>
    </View>
  );
}

export default function InstructorHome({ navigation, signOut }) {

  return (
    <View style={styles.section}>
      <CreateCourse/>
    	<CrsFliptedComponent navigation={navigation}/>
    	{/* <StudentGridComponent
		  students={students}
    	setStudents={setStudents}
    	navigation={navigation}/> */}
    </View>
  )
}


const styles = StyleSheet.create({
    header: {
        marginLeft: 50,
        flex: 1,
        width: "100%",
        justifyContent: 'top',
        alignItems: 'left',
        alignSelf: 'center'
        },
    text: {
        textAlign: 'left',
        fontSize: 28,
        fontStyle: 'bold',
        paddingTop: 20
    },
    section: {
        padding:16,
        justifyContent: 'top'
    },
    header: {
        marginLeft: 50,
        flex: 1,
        width: "100%",
        justifyContent: 'top',
        alignItems: 'left',
        alignSelf: 'center'
    },
    text: {
        textAlign: 'left',
        fontSize: 28,
        fontStyle: 'bold',
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
    }
});