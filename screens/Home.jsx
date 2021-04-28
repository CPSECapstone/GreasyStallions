import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {ListGroup, Button, Col, Row} from 'react-bootstrap'
import Amplify, { Auth, Hub } from 'aws-amplify';

import { apolloClientFlipted} from '../apollo';
import { ApolloProvider, useQuery, gql} from '@apollo/client';

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


const LIST_USERS = gql
`
   query{getUsers{fname lname}}
`;

const LIST_COURSES = gql
`
   query{getCourses{name desc}}
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
      <Text style = {styles.text}> Welcome Student!</Text>
      </View>
    );
  }


const UsrFliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_USERS);
  if (error) { console.log('Error fetching users', error); }
  let students = [];
  console.log(data)

  if(data){
    data.getUsers.forEach( usr =>{
      students.push(<Text style={styles.starshipName}> {usr.fname + " " + usr.lname}</Text>)
    });
  }
  return (
    <View style = {styles.section}>
      <Text style = {styles.text}>{"USERS:"}</Text>
      {students}
    </View>
  );
}

const CrsFliptedComponent = ({navigation}) => {
  const {data, error, loading} = useQuery(LIST_COURSES);
  
  if (error) { console.log('Error fetching users', error); }

  let courses = [];
  console.log("CRS FLIPTED DATA");
  console.log(data)
  console.log(navigation)
  var goToClassPage = () => {
    navigation.navigate('ClassPage', {className: "Test Class"})
  };

  if(data){
    data.getCourses.forEach( crs => {
      let toPush = <ListGroup.Item onClick={() => {navigation.navigate('ClassPage', {
        className: crs.name
      })}}>{crs.name}</ListGroup.Item>
      courses.push(toPush)
    });
  }

  return (
    <View style = {styles.section}>
      <h2>{"COURSES:"}</h2>
      <ListGroup>
        {courses}
      </ListGroup>
      <Button onClick={goToClassPage}>Task tester</Button>
    </View>
  );
}

const TskFliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_TASKS);
  if (error) { console.log('Error fetching users', error); }

  let tasks = [];
  console.log(data)

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


export default function Home({ navigation, signOut }) {
  return (
    
    <View style={styles.header}>
      {console.log(navigation)}
      <ApolloProvider client={apolloClientFlipted}>
        <UserInfo></UserInfo>
        <UsrFliptedComponent />
        <CrsFliptedComponent navigation={navigation}/>
        <TskFliptedComponent />
      </ApolloProvider>
    </View>
  )
}

