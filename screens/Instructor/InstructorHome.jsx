import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import StudentGridComponent from "./StudentGrid.jsx";
import GoalListTeacher from '../Goals/GoalListTeacher';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText, Button} from '@material-ui/core';
import randomColor from 'randomcolor';
// import { TestWatcher } from 'jest';

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
        <Paper onClick={() => {navigation.navigate('ClassPage', {className: crs.course})}} style={{fontSize:18, fontWeight:'bold', justifyContent:'center', backgroundColor: randomColor(), display: 'flex', alignItems: 'center', width: 200, height: 150}} elevation={3}>
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

//currently using the same tasks as on the student page
const TskFliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_TASKS);
  
  let tasks = [];

  if (error) { console.log('Error fetching users', error); }

  if(data){
    data.getTasks.forEach( tsk =>{
      tasks.push(<Text style={styles.starshipName}> {tsk.name + " " + tsk.description}</Text>)
    });
  }

  return (
    <View style = {styles.section}>
      <Text style = {styles.text}>{"TASKS:"}</Text>
      {tasks}
    </View>
  );
}

const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;


export default function InstructorHome({ navigation, signOut }) {

  let studentProgress = [];
  const [students, setStudents] = useState(studentProgress);

  const sampleStudentGoals = [
    {
      student_name: "Jimmy",
      goals: [{
        id: 0,
        name: "Read 10 Books", 
        subCompleted: 1, 
        due: "2021-04-06", 
        subGoals: [
        {
            title: "book1",
            complete: true
        },
        {
            title: "book2",
            complete: false
        },
        {
            title: "book3",
            complete: false
        },
        {
            title: "book4",
            complete: false
        },]
      },
      {
        id: 1,
        name: "Make a friend",
        complete: false,
        due: "2021-04-06",
      }]
    },
    {
      student_name: "Susan",
      goals: [{
        id: 0,
        name: "Read 10 Books", 
        subCompleted: 1, 
        due: "2021-04-06", 
        subGoals: [
        {
            title: "book1",
            complete: true
        },
        {
            title: "book2",
            complete: false
        },
        {
            title: "book3",
            complete: false
        },
        {
            title: "book4",
            complete: false
        },]
      },
      {
        id: 1,
        name: "Make a friend",
        complete: false,
        due: "2021-04-06",
      }]
    }
  ];

  const [studentGoals, setStudentGoals] = useState(sampleStudentGoals);

  return (
    <View style={styles.section}>
      <CrsFliptedComponent navigation={navigation}/>
      <StudentGridComponent
      students={students}
      setStudents={setStudents}
      navigation={navigation}/>
    </View>
  )
}
/*
      <GoalListTeacher
       studentGoals={studentGoals}
       setStudentGoals={setStudentGoals}
       navigation={navigation}/>*/


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

