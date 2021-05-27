import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, gql, useApolloClient} from '@apollo/client';
import {} from '@apollo/client/react/hooks'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Grid, Typography } from '@material-ui/core';

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

  const GET_STUDENTS = gql
  `
    query {
        progressOverview(course: "Integrated Science") {
        userProgress {
            userName
        }
        }
    }
  `

  const GET_MASTERY = gql
  `
  query {
    getAllTargetProgress(courseId: "a71e775af83" username: "") {
      target {
        targetId
        targetName
        description
      }
      objectives {
        objectiveId
        objectiveName
        tasks {
          taskId
          taskName
          mastery
        }
      }
      student
    }
  }
  `;

  const sampleTargetProgress0 = [
    {
      mastery: 0,
    }
  ]

  const sampleTargetProgress1 = [
    {
      mastery: 1,
    }
  ]

  const sampleTargetProgress2 = [
    {
      mastery: 2,
    }
  ]

  const sampleTargetProgress3 = [
    {
      mastery: 3,
    }
  ]


  let MasteryStudentListComponent = ({students, setStudents, filter, setFilter, navigation}) => {

  const client = useApolloClient();

  let fullProgress = {}
  let fullerProgress = []
  let studentList = []
  let targetList = []
  let progressMapByStudent = new Map();

  let masteryColors = new Map()
  masteryColors.set(0, {color: "rgba(196, 196, 196, 1)", width: "0%"})
  masteryColors.set(1, {color: "rgba(234, 104, 104, 1)", width: "33%"})
  masteryColors.set(2, {color: "rgba(242, 201, 76, 1)", width: "66%"})
  masteryColors.set(3, {color: "rgba(48, 204, 48, 1)", width: "100%"})

  let bubbleFilterOptions = new Map();
  bubbleFilterOptions.set(1, "Mastery Low - High")
  bubbleFilterOptions.set(2, "Mastery High - Low")

  let getStudents = () => {
    const {data, error, loading} = useQuery(GET_STUDENTS);
    if (error) { console.log('Error fetching students', error); }
    if(data){
      fullProgress = Object.assign({}, data.progressOverview);
    }
  
    if(fullProgress.userProgress != undefined){
        fullProgress.userProgress.forEach(stud => {
            studentList.push(stud.userName)
        })
    }
  }

  let getMastery = () => {
    const {data, error, loading} = useQuery(GET_MASTERY);
    if (error) { console.log('Error fetching mastery', error); }
    if(data){
      fullerProgress = [...data.getAllTargetProgress];
    }
  
    if(fullerProgress != undefined){
        fullerProgress.forEach(targ => {
            targetList.push(targ.target.targetName)
        })
    }
  }

  let getRandom = () =>{
    return Math.floor(Math.random() * 4)
  }

  let buildProgressMap = () =>{
    studentList.forEach(stud =>{
      if(stud == "Jaime Lannister"){
        progressMapByStudent.set(stud, sampleTargetProgress2)
      } else if(stud== "Daenerys Targaryen"){
        progressMapByStudent.set(stud, sampleTargetProgress3)
      } else{
        progressMapByStudent.set(stud, sampleTargetProgress1)
      }
          })
  }

  let getGridItems = (student) =>{
    let itemList = []
    itemList.push(<Grid item xs={3} style={{marginBottom: "10px"}}>{student}</Grid>)
    progressMapByStudent.get(student).forEach(stud => {
        itemList.push(<Grid item xs={3} style={{
          backgroundColor: masteryColors.get(0).color,
          borderRadius: "10px",
          position: "relative",
          marginBottom: "10px"
          }}><div style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            borderRadius: "10px",
            width: masteryColors.get(stud.mastery).width,
            backgroundColor: masteryColors.get(stud.mastery).color}}></div></Grid>)
      }
    )
    if(itemList.length ==2){
      itemList.push(<Grid item xs={6}></Grid>)
    } else if(itemList.length ==3){
      itemList.push(<Grid item xs={3}></Grid>)
    }
    return itemList
  }

  let getTargetGridItems = () =>{
    let itemList = []
    itemList.push(<Grid item xs={3}></Grid>)
    targetList.forEach(target => {
      itemList.push(<Grid item xs={3}><Typography variant="h5"> {target}</Typography></Grid>)
    })

    if(itemList.length ==2){
      itemList.push(<Grid item xs={6}></Grid>)
    } else if(itemList.length ==3){
      itemList.push(<Grid item xs={3}></Grid>)
    }

    return itemList
  }

  let MasteryLHSort = (tempStudents) => {
    let newTemp = tempStudents.sort(function(s1, s2){
      return progressMapByStudent.get(s1).mastery
       - progressMapByStudent.get(s2).mastery});
    return newTemp;
  }

  let handleChange = (event) =>{
    setFilter(event.target.value)
    let tempStudents = [...studentList];
    let newTemp;
    if(event.target.value === 1){
      newTemp = MasteryLHSort(tempStudents)
    }
    let writeStruct = {
      query: GET_STUDENTS,
      data: {progressOverview: {userProgress: newTemp}}
    }
    client.writeQuery(writeStruct)
  }

  // Query to fetch student progress for this course
  getStudents()
  getMastery()
  buildProgressMap()

  return (
    <View style = {styles.section}>
      <FormControl className="bubblegridfilter">
          <InputLabel id="demo-simple-select-label">FILTER</InputLabel>
          <Select
            value={filter}
            onChange={handleChange}>
            <MenuItem value={1}>{bubbleFilterOptions.get(1)}</MenuItem>
          </Select>
        </FormControl>
      <div class="flex-container">
        <Grid container spacing={2}>
          {getTargetGridItems()}
          {studentList.map(student =>(
            getGridItems(student)
          ))}
        </Grid>
      </div>
    </View>
  );
}


export default MasteryStudentListComponent; 
