import React, { useState } from 'react';
import StudentGridComponent from './StudentGrid';
import CreateMission from '../CreateModals/CreateMission';
import { useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';



  // The landing page for a teacher when they click into a course
  // from their home page
  export default function InstructorClassPage ({route, navigation}) {
    const { className, teacher } = route.params; //change to instructor
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState([]); //use React

    function getInfo(){
      const { className, teacher } = route.params;
      const COURSE_CONTENT = gql 
        `
        query {
          courseContent(course: "${className}") {
            courseInfo {
              instructor description course
            }
            missions {
              name
              id
            }
            targets {
              targetName
            }
          }
        }
        `;

      //get and style Missions
      const {data, error, loading} = useQuery(COURSE_CONTENT);
      if (error) { console.log('Error fetching courses', error); }
      let missions = [];
      let description = '';
      let instructor = '';
    	let userType = teacher ? "teacher" : "student";
      if(data){
        data.courseContent.missions.forEach( mission => {
        let toPush = 
			<TouchableOpacity 
				style = {styles.coursebutton}
				onPress = {() => {
				navigation.navigate("MissionPage", {id: mission.id})}}>
			<Text style={{color: "#FFFFFF"}}>{mission.name}</Text>
			</TouchableOpacity>
        missions.push(toPush)
        });
        
        description = data.courseContent.courseInfo.description;
        instructor = data.courseContent.courseInfo.instructor;
      }
      return {missions, description, instructor};
    }

    let result = getInfo();
    let missions = result.missions;
    let instructor = result.instructor;
    let description = result.description;

  return (
    <View style={styles.container}>
		<Text style={{fontSize: 24, marginTop: 32, marginBottom: 16}}>{className}</Text>
		<Text>{instructor}</Text>
		<Text>{description}</Text>
		<Button 
				title='Mastery View'
				style={styles.navbutton}
				color='#841584'
				onPress={() => {navigation.navigate('MasteryOverviewPage', {className: className})}}>
			</Button>
		<ScrollView>
			<View style={styles.missionlist}>
				{missions}
			</View>
			<StudentGridComponent
			students={students}
			setStudents={setStudents}
			filter={bubbleGridSelect}
			setFilter={setSelect}/>
		</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  textAlign: 'center'
	},
	surface: {
		marginTop: 16,
		padding: 8,
		height: 100,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	  },
	  item: {
		flex: 1,
		height: 160,
		margin: 1
	  },
	  list: {
		flex: 1
	  },
	  coursebutton: {
		margin: 15,
		padding: 8,
		height: 100,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3467EC'
	  },
	  missionlist: {
	  	flexDirection: 'row',
		flexWrap: "wrap",
		justifyContent: 'center',
	  },
	  navbutton: {
		  margin:10,
	  }
  });