import React from 'react';
import {Button, View, Text, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import MissionsView from './Student/Mission/MissionsView';

export default function ClassPage({route, navigation}) {
	const { className = "Integrated Science"} = route.params;
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
    <View style={styles.container}>
		<Text style={styles.text}>Classpage</Text>
		<Text style={styles.titleText}>{(curr === 0) ? "Missions Progress" : "Mastery Progress"}</Text>
		{displayCurr()}	
	</View>
  )
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
	titleText : {
		fontWeight: 'bold'
	},
  });