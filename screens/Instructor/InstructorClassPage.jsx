import React, { useState } from 'react';
import StudentGridComponent from './StudentGrid';
import CreateMission from '../CreateModals/CreateMission';
import { useQuery, gql} from '@apollo/client';
import randomColor from 'randomcolor';
import { ScrollView, TouchableOpacity, View,  StyleSheet } from 'react-native';
import { Divider, List, Surface, Text, Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import Styles from '../../styles/styles';
import {COURSE_CONTENT} from '../CreateModals/CreateGQL';
import Colors from '../../styles/colors';

  // The landing page for a teacher when they click into a course
  // from their home page
  export default function InstructorClassPage ({route, navigation}) {
    const { className, teacher } = route.params; //change to instructor
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState([]); //use React

    function getInfo(){
      const { className, teacher } = route.params;
      

      //get and style Missions
      const {data, error, loading} = useQuery(COURSE_CONTENT, {variables: {className: className}});
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
    <CreateMission course={className}></CreateMission>
			<List.Accordion
			titleStyle ={Styles.title}
			style = {{backgroundColor: '#F2F2F2'}}
				title="Missions">
				{missions}
			</List.Accordion>
      <TouchableOpacity >
        <Divider style = {{marginTop:6}}/>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'flex-end'}}>
					<Button onPress={() => navigation.navigate('MasteryOverviewPage', {className: className})} 
            style = {{marginTop: 32, alignSelf: 'flex-end'}} color={Colors.fliptedColor}  
            labelStyle= {{color: Colors.fliptedColor}} icon="menu">Mastery View</Button>
				</View>
		</TouchableOpacity>
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
