import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {ListGroup, Col, Row} from 'react-bootstrap'

import { apolloClientFlipted} from '../../apollo-flipted';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import "./InstructorHome.css";
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

const StudentGridComponent = () => {
  const {data, error, loading} = useQuery(LIST_TASKS);
  if (error) { console.log('Error fetching students', error); }

  // 3 options for task_progress are in progress (yellow circle), idle (red), and mastered (green)
  let hardcodedstudents = [
    {
      student_name : "Jimmy",
      student_mission_progress : "50",
      student_current_task : "Task 2",
      task_progress : "idle"
    },
    {
      student_name : "Susan",
      student_mission_progress : "60",
      student_current_task : "Task 3",
      task_progress : "mastered"
    },
    {
      student_name : "George",
      student_mission_progress : "65",
      student_current_task : "Task 4",
      task_progress : "in-progress"
    },
    {
      student_name : "Sarah",
      student_mission_progress : "40",
      student_current_task : "Task 3",
      task_progress : "idle"
    },
    {
      student_name : "Jeff",
      student_mission_progress : "82",
      student_current_task : "Task 6",
      task_progress : "mastered"
    },
    {
      student_name : "Dave",
      student_mission_progress : "71",
      student_current_task : "Task 8",
      task_progress : "mastered"
    },
    {
      student_name : "Jimmy",
      student_mission_progress : "50",
      student_current_task : "Task 2",
      task_progress : "idle"
    },
    {
      student_name : "Susan",
      student_mission_progress : "60",
      student_current_task : "Task 3",
      task_progress : "mastered"
    },
    {
      student_name : "George",
      student_mission_progress : "65",
      student_current_task : "Task 4",
      task_progress : "in-progress"
    },
    {
      student_name : "Sarah",
      student_mission_progress : "40",
      student_current_task : "Task 3",
      task_progress : "idle"
    },
    {
      student_name : "Jeff",
      student_mission_progress : "82",
      student_current_task : "Task 6",
      task_progress : "mastered"
    },
    {
      student_name : "Dave",
      student_mission_progress : "71",
      student_current_task : "Task 8",
      task_progress : "mastered"
    }
  ];

  let studentgrid = [];

  console.log(data)

  if(data){
    // fill in database call for dependency injection or production
  }


  // hard coded testing
  hardcodedstudents.forEach(student =>{
    studentgrid.push(student)
  })

  studentgrid.forEach(student => {
    if (student.task_progress === "idle"){
      student.task_progress = "rgb(255, 140, 106)"
    }
    else if(student.task_progress === "in-progress"){
      student.task_progress = "rgb(255, 247, 130)"
    }
    else if(student.task_progress === "mastered"){
      student.task_progress = "rgb(148, 245, 124)"
    }
  })

  return (
    <View style = {styles.section}>
      <Text style = {styles.text}>{"TASKS:"}</Text>
      <div class="flex-container">
        {studentgrid.map(student => (
          <div className={"piechart"} style={{
            backgroundImage: pieChartHelper(student.student_mission_progress)
          }}>
            <div className={"circle"} style={{backgroundColor:student.task_progress,}}>
              <div>{<Text> {student.student_name}</Text>}</div>
              Current Task:
              <div>{student.student_current_task}</div>
            </div>
          </div>
        ))}
      </div>
    </View>
  );
}

let pieChartHelper = (progress) =>{
  let newprogress = 360 - (progress * 0.01 * 360);
  return "conic-gradient(rgb(252, 52, 52)"+newprogress+"deg, rgb(100, 226, 41) 0 0)";
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
        <StudentGridComponent />
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

