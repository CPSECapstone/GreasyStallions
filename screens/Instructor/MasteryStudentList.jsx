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


  let MasteryStudentListComponent = ({students, setStudents, filter, setFilter, setShowTargetMastery, setShowObjMastery}) => {
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
              targetList.push(targ)
          })
      }
    }

    let getRandom = () =>{
      return Math.floor(Math.random() * 4)
    }

    let buildProgressMap = () =>{
      studentList.forEach(stud =>{
        let totalTasks = 0;
        let masteredTasks = 0;
        targetList.forEach(targ => {
          targ.objectives.forEach(obj => {
            obj.tasks.forEach(task => {
              totalTasks = totalTasks + 1;
              if(task.mastery === "MASTERED"){
                masteredTasks = masteredTasks + 1;
              }
            })
          })
        })
        progressMapByStudent.set(stud, {taskMastery: (masteredTasks / totalTasks)})
      })
    }

    let changeView = () => {
      setShowTargetMastery(false)
      setShowObjMastery(true)
    }

    // Query to fetch student progress for this course
    getStudents()
    getMastery()
    buildProgressMap()
  return (
    <View style={Styles.masterycontainer}>
      <View style={{flexDirection: 'row'}}>
      <Text style={Styles.masteryname}>Student</Text>
          {targetList.map(targ => (
            <View style={Styles.masterycolumn}>
              <Button onPress={changeView}
              title={targ.target.targetName}
              accessibilityLabel='switch to objective'></Button>
            </View>
          ))}
          <View style={Styles.masteryprogressbar}></View>
      </View>
      <ScrollView>
        {studentList.map(student =>(
          <View style={Styles.masteryrow}>
            <Text style={Styles.masteryname}>{student}</Text>
            <View style={Styles.masteryprogressbar}>
              <ProgressBar progress={progressMapByStudent.get(student).taskMastery} color={Colors.yellow} style={Styles.masterybar}></ProgressBar>
            </View>
            <View style={Styles.masteryprogressbar}></View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

  export default MasteryStudentListComponent;