import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import {ListGroup, Col, Row} from 'react-bootstrap'

import { apolloClientFlipted} from '../apollo-flipted';
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
  console.log(data)
  console.log(navigation)
  var goToClassPage = () => {
    navigation.navigate('ClassPage')
  }

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
        <UsrFliptedComponent />
        <CrsFliptedComponent navigation={navigation}/>
        <TskFliptedComponent />
      </ApolloProvider>
      <Text style={{paddingTop: 100, textAlign: 'left',fontSize: 20,fontStyle: 'bold'}}>You are now authenticated</Text>
      <Button style={{width:100,backgroundColor:'#99004d',marginTop:20,}}
              onPress={() => navigation.navigate('Welcome')}>
                <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Go to Welcome Screen</Text>
      </Button>
      
      <Button style={{width:100,backgroundColor:'#99004d',marginTop:20,}}
              onPress={() => navigation.navigate('InstructorHome')}>
                <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Instructor View</Text>
      </Button>
      {/* <Button
      onPress={() => navigation.navigate('Profile')}>
        <Text style={{width: "15%",marginLeft:0,alignSelf:'center'}}>Profile</Text>
      </Button> */}
    </View>
  )
}

