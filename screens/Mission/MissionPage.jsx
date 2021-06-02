import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { useQuery, gql} from '@apollo/client';
import { Surface, Text } from 'react-native-paper';


let MissionPage = function({ route, navigation}){

    const { id } = route.params

    const pulledMission = gql
    `
    query {
		mission(missionId: "${id}") {
			name
    	    description
    	    missionContent {
                ... on Task {
                    name
                    id
                }
                ... on SubMission {
                    name
                }
            }
		}
	}
    `;

    const {data, error, loading} = useQuery(pulledMission);
    if (loading) {
        return <View/>
    }

    let taskList = [];
    let submissionList = [];
    // get the list of tasks that are part of the mission
    const getComponents = () => {
        for (let i=0; i<data.mission.missionContent.length; i++) {
            let crMiss = data.mission.missionContent[i]; 
            if (crMiss.__typename === "Task") {
                taskList.push(
                    <TouchableOpacity
						style = {styles.coursebutton}
						 onPress={() => navigation.navigate("TaskPage", {id: crMiss.id})}>
                    	<Text style={{color: "#FFFFFF"}}>{crMiss.name}</Text>
                    </TouchableOpacity>

                )
            } else if (crMiss.__typename === "SubMission") {
                submissionList.push(
                    <TouchableOpacity
						style = {styles.coursebutton}>
                    	<Text style={{color: "#FFFFFF"}}>{crMiss.name}</Text>
                    </TouchableOpacity>
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            {getComponents()}
			<Text>{data.mission.name}</Text>
			<Text style={{textAlign: 'center'}}>{data.mission.description}</Text>
			<Text>Tasks:</Text>
            <ScrollView>
                {taskList}
            </ScrollView>
			<Text>Submissions</Text>
			<ScrollView>{submissionList}</ScrollView>
        </View>
    );
}

export default MissionPage;

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
		marginTop: 16,
		padding: 8,
		height: 100,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3467EC'
	  }
  });