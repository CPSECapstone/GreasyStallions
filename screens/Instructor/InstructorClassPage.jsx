import React, { useState } from 'react';
import StudentGridComponent from './StudentGrid';
import CreateMission from '../CreateModals/CreateMission';
import { useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Divider, List, Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import Styles from '../../styles/styles';


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
				titleStyle = {Styles.item}
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
    <View style={Styles.container}>
		
		<ScrollView>
			<Text style={Styles.header}>{className}</Text>
			<Text style={Styles.info}>{instructor}</Text>
			<Text style={Styles.info}>{description}</Text>
			<TouchableOpacity style = {Styles.coursebutton} onPress={() => navigation.navigate('MasteryOverviewPage', {className: className})}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
					<Text style = {Styles.webTitleText}>Mastery View</Text>
					<Ionicons style = {Styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
				</View>
				<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
			<List.Accordion
			titleStyle ={Styles.title}

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
