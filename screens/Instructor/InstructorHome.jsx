import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {ListGroup, Col, Row} from 'react-bootstrap'
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import StudentGridComponent from "./StudentGrid.jsx";
import GoalListTeacher from '../Goals/GoalListTeacher';
// import { TestWatcher } from 'jest';

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
  }
});

const LIST_COURSES = gql
`
   query{getCourses{name desc}}
`;
const LIST_TASKS = gql
`
   query{getTasks{name description}}
`;



const CrsFliptedComponent = ({navigation}) => {
  const {data, error, loading} = useQuery(LIST_COURSES);
  
  if (error) { console.log('Error fetching users', error); }
  var goToClassPage = () => {
    navigation.navigate('ClassPage')
  }


  // hard coded Sections of an Instructor's classes
  let courses = [
  <ListGroup.Item onClick={() => {navigation.navigate('ClassPage', {
    className: "Biology"
  })}}>{"Biology Section 1"}</ListGroup.Item>,
  <ListGroup.Item onClick={() => {navigation.navigate('ClassPage', {
    className: "Biology"
  })}}>{"Biology Section 2"}</ListGroup.Item>
  ]

  return (
    <View style = {styles.section}>
      <h2>{"MY COURSES:"}</h2>
      <ListGroup>
        {courses}
      </ListGroup>
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

const UserInfo = () => {
    const {data, error, loading} = useQuery(USER_ROLE);
    if (error) { console.log('Error fetching user', error); }
    let role = '';
    let email = '';
    if(data){
      email = data.getUser.email;
      role = data.getUser.role;
    }

    if(role && email){
    return (
      <View style = {styles.section}>
      <Text>Welcome</Text>
      <Text style = {styles.text}>Email: {email}</Text>
      <Text>Role: {role}</Text>
      </View>
    );}
    else{
      return null;
    }
  }

export default function InstructorHome({ navigation, signOut }) {
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

  const samplestudents = [
    {
      student_name : "Jimmy",
      student_mission_progress : "50",
      student_current_task : "Task 2",
      task_progress : "offline"
    },
    {
      student_name : "Susan",
      student_mission_progress : "60",
      student_current_task : "Task 3",
      task_progress : "online-working"
    },
    {
      student_name : "George",
      student_mission_progress : "65",
      student_current_task : "Task 4",
      task_progress : "online-idle"
    },
    {
      student_name : "Sarah",
      student_mission_progress : "40",
      student_current_task : "Task 3",
      task_progress : "offline"
    },
    {
      student_name : "Jeff",
      student_mission_progress : "82",
      student_current_task : "Task 6",
      task_progress : "online-working"
    },
    {
      student_name : "Dave",
      student_mission_progress : "71",
      student_current_task : "Task 8",
      task_progress : "online-working"
    },
    {
      student_name : "Adam",
      student_mission_progress : "54",
      student_current_task : "Task 2",
      task_progress : "online-idle"
    },
    {
      student_name : "Raven",
      student_mission_progress : "56",
      student_current_task : "Task 3",
      task_progress : "online-idle"
    },
    {
      student_name : "Steven",
      student_mission_progress : "80",
      student_current_task : "Task 4",
      task_progress : "online-idle"
    },
    {
      student_name : "Dylan",
      student_mission_progress : "43",
      student_current_task : "Task 3",
      task_progress : "online-idle"
    },
    {
      student_name : "Hannah",
      student_mission_progress : "88",
      student_current_task : "Task 6",
      task_progress : "online-working"
    },
    {
      student_name : "Abby",
      student_mission_progress : "77",
      student_current_task : "Task 8",
      task_progress : "online-working"
    },
    {
      student_name : "Jacob",
      student_mission_progress : "15",
      student_current_task : "Task 1",
      task_progress : "online-idle"
    },
    {
      student_name : "William",
      student_mission_progress : "64",
      student_current_task : "Task 3",
      task_progress : "online-working"
    },
    {
      student_name : "Leo",
      student_mission_progress : "81",
      student_current_task : "Task 4",
      task_progress : "online-working"
    },
    {
      student_name : "Jack",
      student_mission_progress : "20",
      student_current_task : "Task 3",
      task_progress : "offline"
    },
    {
      student_name : "Chris",
      student_mission_progress : "48",
      student_current_task : "Task 6",
      task_progress : "online-working"
    },
    {
      student_name : "Pablo",
      student_mission_progress : "72",
      student_current_task : "Task 5",
      task_progress : "online-working"
    }
  ];

  const [studentGoals, setStudentGoals] = useState(sampleStudentGoals);
  const [students, setStudents] = useState(samplestudents);

  return (
    <View style={styles.header}>
      <ApolloProvider client={apolloClientFlipted}>
        <CrsFliptedComponent navigation={navigation}/>
        <TskFliptedComponent />
      </ApolloProvider>
      <StudentGridComponent
      students={students}
      setStudents={setStudents}
      navigation={navigation}/>
      <GoalListTeacher
       studentGoals={studentGoals}
       setStudentGoals={setStudentGoals}
       navigation={navigation}/>
    </View>
  )
}

