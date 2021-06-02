import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Menu, Divider, Provider } from 'react-native-paper';
import MissionsView from './Student/Mission/MissionsView';
import LearningTaskVisualization from './Student/LearningTargets/LearningTaskVisualization';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useQuery, gql} from '@apollo/client';
import Styles from '../styles/styles';


let ClassPage = function({ route, navigation }){
	const { className, teacher } = route.params;
	const [curr, setCurr] = React.useState(0);
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
		let description = '';
		let instructor = '';
		if(data){
		  description = data.courseContent.courseInfo.description;
		  instructor = data.courseContent.courseInfo.instructor;
		}
		return {description, instructor};
	  }
  
	  let result = getInfo();
	  let missions = result.missions;
	  let instructor = result.instructor;
	  let description = result.description;
 
	 let displayCurr = () => {
		 if (curr === 0) {
			 return <MissionsView className={className}/>
		 } else if (curr === 1) {
			 return <LearningTaskVisualization className={className}/>
		 }
	 }
 
	 return (
		 <ScrollView>
			 <View style = {Styles.container}>
				<Text style={Styles.header}>{className}</Text>
				<Text style={Styles.info}>{instructor}</Text>
				<Text style={Styles.info}>{description}</Text>
			</View>
			 <ScrollView classes={{root: "header"}} >
				<View style={Styles.container}>
					<Button mode="contained" 
					style = {{width: '100%', maxWidth: 500, alignSelf: 'center'}}
					 color={(curr === 0) ? "#3267EF" : "#E0E0E0"} 
					 onPress={() => setCurr(0)}>
						Missions
					</Button>
					<Button mode="contained"
						style = {{width: '100%', maxWidth: 500, alignSelf: 'center'}}
					 onPress={() => setCurr(1)}
					 color={(curr === 1) ? "#3267EF" : "#E0E0E0"}>
						Learning Targets
					</Button>
				</View>
			 </ScrollView>
			 {displayCurr()}
	   </ScrollView>
	);
 }

 export default ClassPage;

