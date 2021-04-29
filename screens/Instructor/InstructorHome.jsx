import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {ListGroup, Col, Row} from 'react-bootstrap'

import { apolloClientFlipted} from '../../apollo-flipted';
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

  let courses = [];
  console.log(data)
  console.log(navigation)
  var goToClassPage = () => {
    navigation.navigate('ClassPage')
  }

  // waiting for instructor database query
  /* if(data){
    data.getCourses.forEach( crs => {
      let toPush = <ListGroup.Item onClick={() => {navigation.navigate('ClassPage', {
        className: crs.name
      })}}>{crs.name}</ListGroup.Item>
      courses.push(toPush)
    });
  } */

  // hard coded Sections of an Instructor's classes
  let newcourses = [
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
        {newcourses}
      </ListGroup>
    </View>
  );
}

//currently using the same tasks as on the student page
const TskFliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_TASKS);
  /* test('getting data from backend', () => {
    expect.toBeDefined(data);
  }); */
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


export default function InstructorHome({ navigation, signOut }) {
  return (
    
    <View style={styles.header}>
      {console.log(navigation)}
      <ApolloProvider client={apolloClientFlipted}>
        <CrsFliptedComponent navigation={navigation}/>
        <StudentGridComponent/>
        <TskFliptedComponent />
      </ApolloProvider>
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

