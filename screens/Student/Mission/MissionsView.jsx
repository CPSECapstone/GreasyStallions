import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Menu, Divider, Provider, Title, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles  from '../../../styles/styles.js';
import { Ionicons } from '@expo/vector-icons';

export default function MissionsView({ className }) {
    const navigation = useNavigation();
    const [ view, setView ] = React.useState(0); // either show all mission or
     // just one mission and the tasks that make it up
    const [ missId, setMissId ] = React.useState("");
    const [ missName, setMissName ] = React.useState("");

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

    let clickHandler = (id, name) => {
        setView(1);
        setMissId(id);
        setMissName(name);
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
                    <TouchableOpacity onPress={() => clickHandler(mission.id, mission.name)}>
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
                        <TouchableOpacity style={Styles.TaskListContainer} onPress={() => taskViewer(crMiss.id)}>
                            <Text style={Styles.info}>{crMiss.name}</Text>
                        </TouchableOpacity>
                    )
                } 
            }
            
            return (
                <View>
                    <TouchableOpacity onPress = {() => setView(0)}  style={{marginTop: 8, flexDirection:'row', justifyItems: 'center'}}>
                        <Ionicons style = {Styles.backButton} name="md-arrow-back" size={32} color='#3467EC'/>
                        <Text style={Styles.webTitleText}>Back</Text>
                    </TouchableOpacity>
                    <Title style={Styles.missionTitleText}>{missName}</Title>
                    <View style={{paddingLeft: "5%"}}>
                        <View style={Styles.blueLine}/>
                    </View>
                    <ScrollView>
                        {taskList}
                    </ScrollView>
                </View>
            )
        }
    }

    return (
        <View>
            {showCurr()}
        </View>
    )
}