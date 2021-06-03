import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useQuery, gql, useApolloClient} from '@apollo/client';
import {} from '@apollo/client/react/hooks';
import { ProgressBar } from 'react-native-paper';
import Styles from '../../styles/styles'
import Colors from '../../styles/colors'
import { ScrollView } from 'react-native-gesture-handler';

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


  let TaskMasteryComponent = ({students, setStudents, filter, setFilter, setShowTargetMastery, objSelected}) => {
    const client = useApolloClient();

    let fullProgress = {}
    let fullerProgress = []
    //const [studentList, setStudentList] = useState([]);
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
              targetList.push(targ)
          })
      }
    }

    let getRandom = () =>{
      return Math.floor(Math.random() * 4)
    }

    let buildProgressMap = (obj) =>{
        if(obj === "Backend-Mocked Objective 1"){
            targetList.forEach(targ =>{
                targ.objectives[0].tasks.forEach(task =>{
                    progressMapByStudent.set(task.taskName, task.mastery)
                })
            })
        } else{
            targetList.forEach(targ =>{
                targ.objectives[1].tasks.forEach(task =>{
                    progressMapByStudent.set(task.taskName, task.mastery)
                })
            })
        }


      /* studentList.forEach(stud =>{
        targetList.forEach(targ => {
          targ.objectives.forEach(obj => {
              let objprogress=0;
              let numtasksinobj=0;
            obj.tasks.forEach(task => {
              numtasksinobj = numtasksinobj + 1;
              if(task.mastery === "MASTERED"){
                objprogress = objprogress + 1;
              }
            })
            progressMapByStudent.set(obj.objectiveName, {objMastery: (objprogress/numtasksinobj)})
          })
        })
      }) */
    }

    let changeView = () =>{
        setShowTargetMastery(true);
    }

    /* let handleChange = (event) =>{
      setFilter(event.target.value)
      let tempStudents = [...studentList];
      let newTemp;
      if(event.target.value === 1){
        newTemp = MasteryLHSort(tempStudents)
      }
      console.log(newTemp)
      let writeStruct = {
        query: GET_STUDENTS,
        data: {progressOverview: {userProgress: newTemp}}
      }
      client.writeQuery(writeStruct)
    } */

    // Query to fetch student progress for this course
    getStudents()
    getMastery()
    buildProgressMap(objSelected)
    let colorMap = new Map();
    colorMap.set("MASTERED", {color: Colors.green, progress: 1})
    colorMap.set("NEARLY_MASTERED", {color: Colors.yellow, progress: 0.75})
    colorMap.set("NOT_MASTERED", {color: Colors.red, progress: 0.25})
    colorMap.set("NOT_GRADED", {color: Colors.light_gray, progress: 0})
    //console.log(objSelected)
    
    if(objSelected === "Backend-Mocked Objective 1"){
  return (
    <View style={Styles.masterycontainer}>
      <View style={{flexDirection: 'row'}}>
      <Text style={Styles.masteryname}>Student</Text>
          {targetList[0].objectives[0].tasks.map(task => (
            <View style={{flex: 1}}>
            <Button onPress={() => {setShowTargetMastery(true)}}
            title={task.taskName}
            accessibilityLabel='switch to objective'></Button>
          </View>
          ))}
      </View>
      <ScrollView>
        {studentList.map(student =>(
          <View style={Styles.masteryrow}>
            <Text style={Styles.masteryname}>{student}</Text>
            {Array.from(progressMapByStudent.keys()).map(task => (
                <View style={Styles.masteryprogressbar}>
                <ProgressBar progress={colorMap.get(progressMapByStudent.get(task)).progress} 
                color={colorMap.get(progressMapByStudent.get(task)).color} style={Styles.masterybar}></ProgressBar>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
} else if(objSelected === "Backend-Mocked Objective 2"){
    return (
        <View style={Styles.masterycontainer}>
          <View style={{flexDirection: 'row'}}>
          <Text style={Styles.masteryname}>Student</Text>
              {targetList[0].objectives[1].tasks.map(task => (
                <View style={{flex: 1}}>
                <Button onPress={() => {setShowTargetMastery(true)}}
                title={task.taskName}
                accessibilityLabel='switch to objective'></Button>
              </View>
              ))}
          </View>
          <ScrollView>
            {studentList.map(student =>(
              <View style={Styles.masteryrow}>
                <Text style={Styles.masteryname}>{student}</Text>
                {Array.from(progressMapByStudent.keys()).map(task => (
                    <View style={Styles.masteryprogressbar}>
                    <ProgressBar progress={colorMap.get(progressMapByStudent.get(task)).progress} 
                    color={colorMap.get(progressMapByStudent.get(task)).color} style={Styles.masterybar}></ProgressBar>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )
}
  }

  export default TaskMasteryComponent;