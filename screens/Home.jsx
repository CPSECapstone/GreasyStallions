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

const LIST_USERS = gql
`
   query{getUsers{fname lname}}
`;

const LIST_COURSES = gql
`
  query{courses{
    name instructor description
  }}
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
      <Text style = {styles.text}> Email: {email}</Text>
      </View>
    );
  }



const CrsFliptedComponent = ({navigation}) => {
  const {data, error, loading} = useQuery(LIST_COURSES);
  
  if (error) { console.log('Error fetching courses', error); }

  let courses = [];
  var goToClassPage = () => {
    navigation.navigate('ClassPage', {className: "Test Class"})
  };

  if(data){
    data.courses.forEach( crs => {
      let toPush = <ListGroup.Item onClick={() => {navigation.navigate('ClassPage', {
        className: crs.name
      })}}>{crs.name}</ListGroup.Item>
      courses.push(toPush)
    });
  }

  return (
    <View style = {styles.section}>
      <h2>{"Courses:"}</h2>
      <ListGroup>
        {courses}
      </ListGroup>
      <Button title="ClassPage" onClick={() => navigation.navigate('ClassPage', 'Health')} />
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

  //tasks is empty right now because there is no query for them yet
  return (
    <View style = {styles.section}>
      <h2>{"Tasks:"}</h2>
      <ListGroup>
        {tasks}
      </ListGroup>
    </View>
  );
}


export default function Home({ navigation, signOut }) {
  return (
    <View style={styles.header}>
      {console.log(navigation)}
        <UserInfo></UserInfo>
        <CrsFliptedComponent navigation={navigation}/>
    </View>
  )
}

/*
<TskFliptedComponent />
      </ApolloProvider>
      <Text style={{paddingTop: 100, textAlign: 'left',fontSize: 20,fontStyle: 'bold'}}>You are now authenticated</Text>
      <div className="my-2 text-center">
        <Button variant="primary" size="lg"
                onPress={() => navigation.navigate('Welcome')}>
                  <Text style={styles.buttonText}>Go to Welcome Screen</Text>
        </Button>
        <Button variant="secondary" size="sm"
                onPress={() => navigation.navigate('InstructorHome')}>
                  <Text style={styles.buttonText}>Instructor View</Text>
        </Button>
      </div>
//      { <Button
//      onPress={() => navigation.navigate('Profile')}>
//        <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Profile</Text>
//      </Button> }
*/
