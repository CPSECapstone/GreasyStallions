import React, { useState } from 'react';
import StudentGridComponent from './StudentGrid';
import CreateMission from '../CreateModals/CreateMission';
import { useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Divider, List, Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'


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
			<List.Item 
				titleStyle = {styles.item}
				title={mission.name} 
				onPress = {() => {
				navigation.navigate("MissionPage", {id: mission.id})}}
			/>
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
		
		<ScrollView>
			<Text style={styles.header}>{className}</Text>
			<Text style={styles.info}>{instructor}</Text>
			<Text style={styles.info}>{description}</Text>
			<TouchableOpacity style = {styles.coursebutton} onPress={() => navigation.navigate('MasteryOverviewPage', {className: className})}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
					<Text style = {styles.text}>Mastery View</Text>
					<Ionicons style = {styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
				</View>
				<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
			<List.Accordion
			titleStyle ={styles.title}

			style = {{backgroundColor: '#F2F2F2'}}
				title="Missions">
				{missions}
			</List.Accordion>
			<View style = {{marginTop: 16, marginBottom: 32}}>
				<StudentGridComponent
				students={students}
				setStudents={setStudents}
				filter={bubbleGridSelect}
				setFilter={setSelect}/>
			</View>
		</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
	header: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginTop: 16
	},
	info: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	fontSize: 18,
		marginTop: 6
	},
	item: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	fontSize: 18,
		marginLeft: -14
	},
	title: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginTop: 16,
		marginLeft: -14,
		marginBottom: 12
	},
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 16
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
	  list: {
		flex: 1
	  },
	  coursebutton: {
		height: 75,
		width: '50%',
		justifyContent: 'center',
		alignSelf: 'center'	
	},
	text: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 24
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