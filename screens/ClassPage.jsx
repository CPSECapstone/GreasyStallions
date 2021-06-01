import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { gql } from '@apollo/client';
import { Button, Text } from 'react-native-paper';
import MissionsView from './Student/Mission/MissionsView';
import LearningTaskVisualization from './Student/LearningTargets/LearningTaskVisualization';


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
				<View style={styles.header}>
					<Text>
						{(curr === 0) ? "Missions Progress" : "Mastery Progress"}
					</Text>
					<Button mode="contained" 
					 color={(curr === 0) ? "#3267EF" : "#E0E0E0"} 
					 onPress={() => setCurr(0)}>
						Missions
					</Button>
					<Button mode="contained"
					 onPress={() => setCurr(1)}
					 color={(curr === 1) ? "#3267EF" : "#E0E0E0"}>
						Learning Targets
					</Button>
				</View>
			 </ScrollView>
			 {displayCurr()}
	   </View>
	);
 }

 export default ClassPage;

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		padding: "2%",
		justifyContent: 'space-evenly',
	},	
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
  doubleButtons: {
	flexDirection: 'row',
	justifyContent: 'space-between',
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