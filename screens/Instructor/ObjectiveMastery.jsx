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


  let ObjectiveMasteryComponent = ({students, setStudents, filter, setFilter, setShowTargetMastery, setShowObjMastery, setObjSelected}) => {
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

    let buildProgressMap = () =>{
      studentList.forEach(stud =>{
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
      })
    }

    // Query to fetch student progress for this course
    getStudents()
    getMastery()
    buildProgressMap()
    let colorMap = new Map();
    colorMap.set(1, Colors.green)
    colorMap.set(0.25, Colors.red)
  return (
    <View style={Styles.masterycontainer}>
      <View style={{flexDirection: 'row'}}>
      <Text style={Styles.masteryname}>Student</Text>
          {targetList[0].objectives.map(obj => (
            <View style={Styles.masterycolumn}>
            <Button onPress={() => {
                setShowObjMastery(false)
                setObjSelected(obj.objectiveName)
            }}
            title={obj.objectiveName}
            accessibilityLabel='switch to objective'></Button>
          </View>
          ))}
      </View>
      <ScrollView>
        {studentList.map(student =>(
          <View style={Styles.masteryrow}>
            <Text style={Styles.masteryname}>{student}</Text>
            {Array.from(progressMapByStudent.keys()).map(obj => (
                <View style={Styles.masteryprogressbar}>
                <ProgressBar progress={progressMapByStudent.get(obj).objMastery} 
                color={colorMap.get(progressMapByStudent.get(obj).objMastery)} style={Styles.masterybar}></ProgressBar>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

  export default ObjectiveMasteryComponent;