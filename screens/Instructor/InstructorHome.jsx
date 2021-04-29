import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {ListGroup, Col, Row} from 'react-bootstrap'
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import StudentGridComponent from "./StudentGrid.jsx";
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

  const [studentGoals, setStudentGoals] = useState(sampleStudentGoals);

  return (
    <View style={styles.header}>
      <ApolloProvider client={apolloClientFlipted}>
        <CrsFliptedComponent navigation={navigation}/>
        <StudentGridComponent/>
        <TskFliptedComponent />
      </ApolloProvider>
      <GoalListTeacher
       studentGoals={studentGoals}
       setStudentGoals={setStudentGoals}
       navigation={navigation}/>
      <Text style={{paddingTop: 100, textAlign: 'left',fontSize: 20,fontStyle: 'bold'}}>You are now authenticated</Text>
      <Button style={{width:100,backgroundColor:'#99004d',marginTop:20,}}
       onPress={() => navigation.navigate('SignUp')}>
        <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Sign Out</Text>
      </Button>

      <Button style={{width:100,backgroundColor:'#99004d',marginTop:20,}}
       onPress={() => navigation.navigate('Home')}>
        <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Student View</Text>
      </Button>
    </View>
  )
}

