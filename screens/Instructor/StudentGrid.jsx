import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    section: {
      padding:16,
      justifyContent: 'top'
    }
  });

  const LIST_STUDENTS = gql
  `
    query {progressByCourse(course: "Integrated Science") {userName progress {taskId status}}}
  `;

  let StudentGridComponent = ({students, setStudents, navigation}) => {

  const [bubbleGridSelect, setSelect] = React.useState('');
  let studentsInfo = new Map()

  // Query to fetch students for this course
  const {data, error, loading} = useQuery(LIST_STUDENTS);
  if (error) { console.log('Error fetching students', error); }
  if(data){
    setStudents(data.progressByCourse);
    console.log("setting students") 
  }

  

  let sortProgressLH = (students) => {
    return students.sort(function(s1, s2){return studentsInfo.get(s1).mission_progress - studentsInfo.get(s1).mission_progress});
  }

  let sortProgressHL = (students) => {
    return students.sort(function(s1, s2){return s2.student_mission_progress - s1.student_mission_progress});
  }

  let sortAlphabetical = (students) => {
    return students.sort(function(s1, s2){return s1.userName > s2.userName});
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

  students.forEach(student =>{
    let statusColor = "rgb(48, 204, 48)"; // green, change for database query to empty string
    let totalTasksInMission = 0;
    let numTasksComplete = 0;
    let studentProgress = 0;
    totalTasksInMission = student.progress.length;
    student.progress.forEach(task => {
      if(task.status === true){
        numTasksComplete++;
      }
    })
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

  let handleChange = (event) => {
    setSelect(event.target.value)
    if(event.target.value === 1){
      MissionProgressLHSort();
    }
    else if(event.target.value === 2){
      MissionProgressHLSort();
    }
    else if(event.target.value === 3){
      AlphabeticalSort();
    }
    else if(event.target.value === 4){
      ActivitySort();
    }
  };

  return (
    <View style = {styles.section}>
      <Text style = {styles.text}>{"STUDENTS:"}</Text>
      <FormControl className="bubblegridfilter">
        <InputLabel id="demo-simple-select-label">FILTER</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bubbleGridSelect}
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
              <div><Text> {student.userName}</Text></div>
              <div><Text>Current Task:</Text></div>
              {/* <div><Text>{student.student_current_task}</Text></div> */}
              </div>
          </div>
        ))}
      </div>
    </View>
  );
}


export default StudentGridComponent;