import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { useQuery, gql} from '@apollo/client';
import { Divider, List,  Surface, Text } from 'react-native-paper';


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
					<List.Item 
						titleStyle = {styles.item}
						title={crMiss.name} 
						onPress = {() => {
							navigation.navigate("TaskPage", {id: crMiss.id})}}
					/>
                )
            } else if (crMiss.__typename === "SubMission") {
                submissionList.push(
					<List.Item 
						titleStyle = {styles.item}
						title={crMiss.name} 
					/>
                )
            }
        }
    }

    return (

		<View>
			<ScrollView>
				{getComponents()}
				<Text style = {styles.header}>{data.mission.name}</Text>
				<Text style={styles.info}>{data.mission.description}</Text>
				<Divider style = {{marginTop: 16, marginBottom: 16}}></Divider>
				<List.Accordion titleStyle = {styles.title}
					style = {{backgroundColor: '#F2F2F2'}}
					title = 'Tasks'>
					{taskList}
				</List.Accordion>
				<List.Accordion titleStyle = {styles.title}
					style = {{backgroundColor: '#F2F2F2'}}
					title = 'Sub-Missions'>
					{submissionList}
				</List.Accordion>
			</ScrollView>
		</View>
    );
}

export default MissionPage;

const styles = StyleSheet.create({
	header: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginTop: 16,
		marginLeft: 16
	},
	info: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	fontSize: 18,
		marginTop: 6,
		marginLeft: 16
	},
	item: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	fontSize: 18,
	},
	title: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28
	},
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
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
		
	  }
  });