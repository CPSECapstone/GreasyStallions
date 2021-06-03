import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {} from '@apollo/client/react/hooks';
import { useQuery, gql, useApolloClient} from '@apollo/client';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const LIST_STUDENTS = gql
  `
    query {progressByCourse(course: "Integrated Science") {userName progress {taskId status}}}
  `;

let StudentGridComponent = ({students, setStudents, filter, setFilter}) =>{
	let studentsInfo = new Map();
  const client = useApolloClient();
  const [visible, setVisible] = React.useState(false);

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

  /* let checkFilterLHWorking = (newTemp) => {
    var assert = require('assert')
    let expectedSortedStudents = require('./testFilterLH.json')
    assert.deepStrictEqual(newTemp, expectedSortedStudents.expected)
  } */

  let handleChange = (option) => {
    //setFilter(event.target.value)
    let tempStudents = [...students];
    let newTemp;
    if(option === 1){
      newTemp = MissionProgressLHSort(tempStudents)
    }
    else if(option === 2){
      newTemp = MissionProgressHLSort(tempStudents)
    }
    else if(option === 3){
      newTemp = AlphabeticalSort(tempStudents)
    }
    else if(option === 4){
      newTemp = ActivitySort(tempStudents)
    }
    let writeStruct = {
      query: LIST_STUDENTS,
      data: {progressByCourse: newTemp}
    }
    client.writeQuery(writeStruct)
	closeMenu()
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
	<Provider>
		<View style={styles.container}>
			<Menu
				visible={visible}
				style={styles.filter}
				onDismiss={closeMenu}
				anchor={<Button onPress={openMenu} style={{}}>FILTER STUDENTS</Button>}>
				<Menu.Item onPress={() => {handleChange(1)}} title={bubbleFilterOptions.get(1)} />
				<Menu.Item onPress={() => {handleChange(2)}} title={bubbleFilterOptions.get(2)} />
				<Menu.Item onPress={() => {handleChange(3)}} title={bubbleFilterOptions.get(3)} />
				<Menu.Item onPress={() => {handleChange(4)}} title={bubbleFilterOptions.get(4)} />
				<Divider />
			</Menu>
			<View style={styles.grid}>
				{students.map(student => (
						<AnimatedCircularProgress
							style={styles.circle}
							size={150}
							width={10}
							rotation={0}
							backgroundWidth={10}
							fill={studentsInfo.get(student).mission_progress}
							tintColor="#2F80ED"
							backgroundColor="#E0E0E0">
							{
								() => (
								<Text>
									{student.userName}
								</Text>
								)
							}
						</AnimatedCircularProgress>
				))}
			</View>
		</View>
	</Provider>
  )
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  width: '100%'
	},
	text: {
	  textAlign: 'center'
	},
	circle:{
		margin: 10,
		flexDirection: 'row'
	},
	grid: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: "wrap",
	},
  });
  export default StudentGridComponent;