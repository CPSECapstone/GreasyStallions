import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import {Dropdown, dropdown} from 'react-bootstrap'
import {ListGroup, Col, Row} from 'react-bootstrap'
import {Typography,Box} from '@material-ui/core';

/* 
import { apolloClientFlipted} from '../../apollo-flipted';
import { ApolloProvider, useQuery, gql} from '@apollo/client'; */
import "./InstructorHome.css";
import { render } from 'react-native-testing-library';
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
    },
    section: {
      padding:16,
      justifyContent: 'top'
    }
  });

  let studentgrid = [];

let StudentGridComponent = ({students, setStudents, navigation}) => {
//   const {data, error, loading} = useQuery(LIST_TASKS);
//   if (error) { console.log('Error fetching students', error); }

  // 3 options for task_progress are in progress (yellow circle), idle (red), and mastered (green)


  //let studentgrid = [];

//   console.log(data)

  /* if(data){
    // fill in database call for dependency injection or production
  } */

  let sortProgressLH = (students) => {
    return students.sort(function(s1, s2){return s1.student_mission_progress - s2.student_mission_progress});
  }

  let sortProgressHL = (students) => {
    return students.sort(function(s1, s2){return s2.student_mission_progress - s1.student_mission_progress});
  }

  let sortAlphabetical = (students) => {
    return students.sort(function(s1, s2){return s1.student_name > s2.student_name});
  }

  let sortActivity = (students) => {
    return students.sort(function(s1, s2){return s1.task_progress < s2.task_progress});
  }
  
  let MissionProgressLHSort = () => {
    let tempStudents = [...students];
    setStudents(sortProgressLH(tempStudents))
  }

  let MissionProgressHLSort = () => {
    let tempStudents = [...students];
    setStudents(sortProgressHL(tempStudents))
  }

  let AlphabeticalSort = () => {
    let tempStudents = [...students];
    setStudents(sortAlphabetical(tempStudents))
  }

  let ActivitySort = () => {
    let tempStudents = [...students];
    setStudents(sortActivity(tempStudents))
  }


  // hard coded testing
  students.forEach(student =>{
    studentgrid.push(student)
  })

  studentgrid.forEach(student => {
    if (student.task_progress === "1"){
      student.task_progress = "rgb(255, 140, 106)"
    }
    else if(student.task_progress === "2"){
      student.task_progress = "rgb(255, 247, 130)"
    }
    else if(student.task_progress === "3"){
      student.task_progress = "rgb(148, 245, 124)"
    }
  })

  return (
    <View style = {styles.section}>
      <Typography variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            Students
          </Box>
        </Typography>
      <Dropdown style = {{marginLeft: 16, alignSelf: 'left'}}>
            <Dropdown.Toggle id="dropdown-basic">
            Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={MissionProgressLHSort}>Mission Progress Low - High</Dropdown.Item>
        <Dropdown.Item onClick={MissionProgressHLSort}>Mission Progress High - Low</Dropdown.Item>
        <Dropdown.Item onClick={AlphabeticalSort}>Alphabetical</Dropdown.Item>
        <Dropdown.Item onClick={ActivitySort}>Activity</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div class="flex-container">
        {students.map(student => (
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


export default StudentGridComponent;