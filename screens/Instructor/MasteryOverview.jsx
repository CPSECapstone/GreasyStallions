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
    }
  });

  const GET_MASTERY = gql
  `
  query {
    progressOverview(course: "Integrated Science") {
      userProgress {
        userName
        progress {
          taskId
          status
        }
      }
      courseInfo {
        courseId
        course
        instructor
        description
      }
      missions {
        id
        course
        name
        description
      }
      targets {
        targetId
        targetName
        description
        subject
        gradeLevel
        icon
        standards
        course
        objectives {
          objectiveId
          objectiveName
          description
          targetId
          targetName
          course
          tasks {
            id
            name
            startAt
            endAt
            dueDate
            course
            missionId
            subMissionId
            objectiveId
            targetId
          }
        }
      }
    }
  }  
  `;

  let MasteryOverviewComponent = ({masteryProgress, setMasteryProgress, navigation}) => {

//   const [bubbleGridSelect, setSelect] = React.useState('');
  let studentsInfo = new Map();

  // Query to fetch students for this course
  const {data, error, loading} = useQuery(GET_MASTERY);
  if (error) { console.log('Error fetching mastery for students', error); }
  if(data){
    console.log(data.progressOverview.courseInfo.course)
    setMasteryProgress(data);
    // console.log(masteryProgress)
  }
  
//   let listStudents = [];
  let listStudents = masteryProgress.progressOverview
  //console.log(listStudents)

  return (
    <View style = {styles.section}>
      <Text style = {styles.text}>{"STUDENTS:"}</Text>
      
    </View>
  );
}


export default MasteryOverviewComponent;