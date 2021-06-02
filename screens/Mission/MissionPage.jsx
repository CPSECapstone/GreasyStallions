import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { useQuery, gql} from '@apollo/client';
import { Divider, List,  Surface, Text } from 'react-native-paper';
import Styles from '../../styles/styles';

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
						titleStyle = {Styles.item}
						title={crMiss.name} 
						onPress = {() => {
							navigation.navigate("TaskPage", {id: crMiss.id})}}
					/>
                )
            } else if (crMiss.__typename === "SubMission") {
                submissionList.push(
					<List.Item 
						titleStyle = {Styles.item}
						title={crMiss.name} 
					/>
                )
            }
        }
    }

    return (

		<View style = {Styles.container}>
			<ScrollView contentContainerStyle = {Styles.webContainer}>
				{getComponents()}
				<Text style = {Styles.header}>{data.mission.name}</Text>
				<Text style={Styles.info}>{data.mission.description}</Text>
				<Divider style = {{marginTop: 16, marginBottom: 16}}></Divider>
				<List.Accordion titleStyle = {Styles.title}
					style = {{backgroundColor: '#F2F2F2'}}
					title = 'Tasks'>
					{taskList}
				</List.Accordion>
				<List.Accordion titleStyle = {Styles.title}
					style = {{backgroundColor: '#F2F2F2'}}
					title = 'Sub-Missions'>
					{submissionList}
				</List.Accordion>
			</ScrollView>
		</View>
    );
}

export default MissionPage;

