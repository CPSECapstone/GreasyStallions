import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Menu, Divider, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles  from '../../../styles/styles.js';

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
                    <TouchableOpacity onPress={() => navigation.navigate("MissionPage", {id: mission.id})}>
                        <AnimatedCircularProgress
                            style={Styles.circle}
                            size={150}
                            width={10}
                            rotation={0}
                            backgroundWidth={10}
                            fill={25}
                            tintColor="#2F80ED"
                            backgroundColor="#E0E0E0">
                            {
                                () => (
                                <Text>
                                    {mission.name}
                                </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </TouchableOpacity>
                    
                );
            });

            return (
                <View style = {Styles.grid}>
                    {missions}
                </View>
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