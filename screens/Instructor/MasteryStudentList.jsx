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
import { Typography } from '@material-ui/core';

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


  let MasteryStudentListComponent = ({masteryProgress, setMasteryProgress, navigation}) => {

  const client = useApolloClient();

  let fullProgress = {}
  let fullerProgress = []
  let studentList = []
  let targetList = []
  let progressMapByStudent = new Map();

  let getStudents = () => {
    const {data, error, loading} = useQuery(GET_STUDENTS);
    if (error) { console.log('Error fetching students', error); }
    if(data){
      fullProgress = Object.assign({}, data.progressOverview);
      // console.log("yee"+fullProgress)
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
        //console.log(data)
      fullerProgress = [...data.getAllTargetProgress];
    }
    //console.log("ba"+fullerProgress[0])

    if(fullerProgress != undefined){
        fullerProgress.forEach(targ => {
            targetList.push(targ.target.targetName)
        })
        ///console.log(targetList)
    }
  }

  // Query to fetch student progress for this course
  getStudents()
  getMastery()

  //console.log(studentList)
  //console.log(targetList)





  return (
    <View style = {styles.section}>
      <div class="flex-container">
        {targetList.map(target => (
          <Typography variant="h5"> {target}</Typography>
        ))}
        {studentList.map(student => (
          <GridList className="meh" cols={3}>
            <GridListTile key={student}>
              <GridListTileBar title={student}></GridListTileBar>
            </GridListTile>
          </GridList>
        ))}
      </div>
    </View>
  );
}


export default MasteryStudentListComponent; 