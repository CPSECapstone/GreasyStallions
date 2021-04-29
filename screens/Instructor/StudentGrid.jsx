import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {Dropdown, dropdown} from 'react-bootstrap'
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

let StudentGridComponent = () => {
//   const {data, error, loading} = useQuery(LIST_TASKS);
//   if (error) { console.log('Error fetching students', error); }

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
      student_name : "Adam",
      student_mission_progress : "54",
      student_current_task : "Task 2",
      task_progress : "idle"
    },
    {
      student_name : "Raven",
      student_mission_progress : "56",
      student_current_task : "Task 3",
      task_progress : "mastered"
    },
    {
      student_name : "Steven",
      student_mission_progress : "80",
      student_current_task : "Task 4",
      task_progress : "in-progress"
    },
    {
      student_name : "Dylan",
      student_mission_progress : "43",
      student_current_task : "Task 3",
      task_progress : "idle"
    },
    {
      student_name : "Hannah",
      student_mission_progress : "88",
      student_current_task : "Task 6",
      task_progress : "mastered"
    },
    {
      student_name : "Abby",
      student_mission_progress : "77",
      student_current_task : "Task 8",
      task_progress : "mastered"
    }
  ];

  let studentgrid = [];

//   console.log(data)

  /* if(data){
    // fill in database call for dependency injection or production
  } */


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
      <Text style = {styles.text}>{"STUDENTS:"}</Text>
      <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            FILTER
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item as={Button} onPress={sortAlphabetical(studentgrid)}>Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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

let sortAlphabetical = (students) => {
    return students.sort(function(s1, s2){return s1.student_mission_progress - s2.student_mission_progress});
}


export default StudentGridComponent;