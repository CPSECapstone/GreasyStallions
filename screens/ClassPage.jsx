import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { gql } from '@apollo/client';
import { Text } from 'react-native-paper';
import MissionsView from './Student/Mission/MissionsView';


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
 
	 let displayCurr = () => {
		 if (curr === 0) {
			 return <MissionsView className={className}/>
		 } else if (curr === 1) {
			 return <LearningTaskVisualization className={className}/>
		 }
	 }
 
	 return (
		 <View>
			 <ScrollView classes={{root: "header"}} >
				<Text style={styles.coursebutton}>
					{(curr === 0) ? "Missions Progress" : "Mastery Progress"}
				</Text>

				<TouchableOpacity
				  style={styles.coursebutton} 
				  onPress={ () => setCurr(0)}
				>
				<Text style={{color: "#FFFFFF"}}>
					Missions
				</Text>
				</TouchableOpacity>

				<TouchableOpacity
				  style={styles.coursebutton} 
				  onPress={ () => setCurr(1)}
				>
				<Text style={{color: "#FFFFFF"}}>
					Learning Targets
				</Text>
				</TouchableOpacity>
			 </ScrollView>
			 {displayCurr()}
	   </View>
	);
 }

 export default ClassPage;

const styles = StyleSheet.create({
  section: {
	padding:16,
  },
  header: {
	marginLeft: 50,
	flex: 1,
	width: "100%",
	alignSelf: 'center'
  },
  text: {
	textAlign: 'left',
	fontSize: 28,
	paddingTop: 20
  },
  buttons: {
	width: 100,
	backgroundColor: '#99004d',
	marginTop: 20
  },
  buttonText: {
	width: "15%",
	marginLeft: 0,
	alignSelf: 'center'
  },
  coursebutton: {
	marginTop: 16,
	padding: 8,
	height: 100,
	width: 250,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#3467EC'
  }
});
