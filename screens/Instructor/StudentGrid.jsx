import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, gql, useApolloClient} from '@apollo/client';
import {} from '@apollo/client/react/hooks';
import { Typography } from '@material-ui/core';
import "./testFilterLH.json"

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

  const LIST_STUDENTS = gql
  `
    query {progressByCourse(course: "Integrated Science") {userName progress {taskId status}}}
  `;

  let StudentGridComponent = ({students, setStudents, filter, setFilter}) => {

  let studentsInfo = new Map();
  const client = useApolloClient();

  // Query to fetch students for this course
  const {data, error, loading} = useQuery(LIST_STUDENTS);
  if (error) { console.log('Error fetching students', error); }
  if(data){
    setStudents(data.progressByCourse);
  }
  
  let MissionProgressLHSort = (tempStudents) => {
    let newTemp = tempStudents.sort(function(s1, s2){return studentsInfo.get(s1).mission_progress
     - studentsInfo.get(s2).mission_progress});
    return newTemp;
  }

  let MissionProgressHLSort = (tempStudents) => {
    let newTemp = tempStudents.sort(function(s1, s2){return studentsInfo.get(s2).mission_progress - 
     studentsInfo.get(s1).mission_progress});
    return newTemp;
  }

  let AlphabeticalSort = (tempStudents) => {
    let newTemp = tempStudents.sort(function(s1, s2){return s1.userName > s2.userName});
    return newTemp;
  }

  let ActivitySort = (tempStudents) => {
    let newTemp = tempStudents.sort(function(s1, s2){return s1.task_progress < s2.task_progress});
    return newTemp;
  }

  //create map of students with additional fields to make filtering easy
  students.forEach(student =>{
    let statusColor = "rgb(48, 204, 48)"; // green, change for database query to empty string
    let totalTasksInMission = 0;
    let numTasksComplete = 0;
    let studentProgress = 0;
    totalTasksInMission = student.progress.length;
    student.progress.forEach(task => {
      if(task.status){
        numTasksComplete++;
      }
    });
    studentProgress = (numTasksComplete / totalTasksInMission) * 100;

    // commented until we have a database call for if students are online
    /* if (student.task_progress === "offline"){
      statusColor = "rgb(170, 177, 186)" // grey
    }
    if (student.task_progress === "online-idle"){
      statusColor = "rgb(242, 201, 76)" // yellow
    }
    if (student.task_progress === "online-working"){
      statusColor = "rgb(48, 204, 48)" // green
    } */

    studentsInfo.set(student, {status: statusColor, mission_progress: studentProgress})
  })

  let bubbleFilterOptions = new Map();
  bubbleFilterOptions.set(1, "Mission Progress Low - High")
  bubbleFilterOptions.set(2, "Mission Progress High - Low")
  bubbleFilterOptions.set(3, "Alphabetical")
  bubbleFilterOptions.set(4, "Online Status")

  let checkFilterLHWorking = (newTemp) => {
    var assert = require('assert')
    let expectedSortedStudents = require('./testFilterLH.json')
    assert.deepStrictEqual(newTemp, expectedSortedStudents.expected)
  }

  let handleChange = (event) => {
    setFilter(event.target.value)
    let tempStudents = [...students];
    let newTemp;
    if(event.target.value === 1){
      newTemp = MissionProgressLHSort(tempStudents)
      try{
        checkFilterLHWorking(newTemp)
      } catch(err){
        console.error("FAIL: filter low to high not working")
      }
    }
    else if(event.target.value === 2){
      newTemp = MissionProgressHLSort(tempStudents)
    }
    else if(event.target.value === 3){
      newTemp = AlphabeticalSort(tempStudents)
    }
    else if(event.target.value === 4){
      newTemp = ActivitySort(tempStudents)
    }
    let writeStruct = {
      query: LIST_STUDENTS,
      data: {progressByCourse: newTemp}
    }
    client.writeQuery(writeStruct)
  };

  return (
    <View style = {styles.section}>
      <div class="grid-container">
        <FormControl className="bubblegridfilter">
          <InputLabel id="demo-simple-select-label">FILTER</InputLabel>
          <Select
            value={filter}
            onChange={handleChange}>
            <MenuItem value={1}>{bubbleFilterOptions.get(1)}</MenuItem>
            <MenuItem value={2}>{bubbleFilterOptions.get(2)}</MenuItem>
            <MenuItem value={3}>{bubbleFilterOptions.get(3)}</MenuItem>
            <MenuItem value={4}>{bubbleFilterOptions.get(4)}</MenuItem>
          </Select>
        </FormControl>
        <div class="flex-container">
          {students.map(student => (
            <div class="student">
              <div class="status-circle" style={{backgroundColor: studentsInfo.get(student).status}}></div>
              <CircularProgress style={
                {border: "solid", borderRadius: "50%", borderColor: "rgb(170, 177, 186)", borderWidth: "10px"}}
              variant="determinate" 
              size="95%"
              thickness="3"
              value={studentsInfo.get(student).mission_progress} />
              <div class={"info"}>
                <div><Typography variant="body2"> {student.userName}</Typography></div>
                <div><Typography variant="body2">Current Task:</Typography></div>
                {/* {<div><Text>{student.student_current_task}</Text></div>} */}
                </div>
            </div>
          ))}
        </div>
      </div>
    </View>
  );
}


export default StudentGridComponent;