import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Alert, ListGroup, Button, Col, Row, Card, Accordion} from 'react-bootstrap'
import { useQuery, gql} from '@apollo/client';
import { Typography, Paper, Grid } from '@material-ui/core';
let MissionPage = function({ route, navigation}){

    const { id } = route.params
    let names = ["Mission 1", "Mission 2", "Mission 3"];

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
                    <Paper style={{fontSize:18, fontWeight:'bold', 
                     justifyContent:'center', backgroundColor: 'light-grey', 
                     display: 'flex', alignItems: 'center', width: 200, height: 75}}
                     elevation={3} 
                     onClick={() => navigation.navigate("TaskPage", {id: crMiss.id})}>
                        {crMiss.name}
                    </Paper>
                )
            } else if (crMiss.__typename === "SubMission") {
                submissionList.push(
                    <Paper elevation={3}>
                       {crMiss.name}
                   </Paper>
                )
            }
        }
    }

    return (
        <View>
            {getComponents()}
            <Typography align='center' variant="h3">
                {data.mission.name}
            </Typography>
            <Typography align='center' variant="h5">
                {data.mission.description}
            </Typography>
            <Typography variant="h4">
                Tasks
            </Typography>
            <Grid style={{padding:16, marginTop: 32, marginLeft: 32}}
             container direction="row" justify="left" alignItems="center">
                {taskList}
            </Grid>
            <Typography variant="h4">
                SubMissions
            </Typography>
            <Grid style={{padding:16, marginTop: 32, marginLeft: 32}}
             container direction="row" justify="left" alignItems="center">
                {submissionList}
            </Grid>
        </View>
    );
}

export default MissionPage;