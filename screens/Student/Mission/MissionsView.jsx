import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function MissionsView({ className }) {
    const navigation = useNavigation();
    const [ view, setView ] = React.useState(0); // either show all mission or
     // just one mission and the tasks that make it up
    const [ missId, setMissId ] = React.useState("");

    const MISSION_QUERY = gql
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

    const TASK_QUERY = gql
    `
    query {
		mission(missionId: "${missId}") {
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

    let clickHandler = (id) => {
        setView(1);
        setMissId(id);
    }

    let taskViewer = (id) => {
        navigation.navigate('TaskPage', {id: id})
    }

    let showCurr = () => { 
        if (view === 0) {
            const { data, error, loading } = useQuery(MISSION_QUERY);
            
            if (loading) {
                return <View/>
            }

            let missions = [];
            data.courseContent.missions.forEach( mission => {
                missions.push(
                    <TouchableOpacity onPress={() => clickHandler(mission.id)}>
                        <Text>{mission.name}</Text>
                    </TouchableOpacity>
                );
            });

            return (
                <ScrollView>
                    {missions}
                </ScrollView>
            );
        } else if (view === 1) {
            const { data, error, loading } = useQuery(TASK_QUERY);
            
            if (loading) {
                return <View/>
            }

            let taskList = [];

            for (let i=0; i<data.mission.missionContent.length; i++) {
                let crMiss = data.mission.missionContent[i]; 
                if (crMiss.__typename === "Task") {
                    taskList.push(
                        <TouchableOpacity onPress={() => taskViewer(crMiss.id)}>
                            <Text>{crMiss.name}</Text>
                        </TouchableOpacity>
                    )
                } 
            }
            
            return (
                <div st>
                    <Button onPress={() => setView(0)}>
                        Back to Missions
                    </Button>
                    <ScrollView>
                        {taskList}
                    </ScrollView>
                </div>
            )
        }
    }

    return (
        <View>
            {showCurr()}
        </View>
    )
}