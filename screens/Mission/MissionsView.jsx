import React from 'react';
import { View } from 'react-native';
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useNavigation } from '@react-navigation/native';
import { Button, Grid, ListItem, List, ListItemText, Paper, Typography, CiruclarProgress, LinearProgress } from "@material-ui/core";

/**
 * This is going to be used to fill the components on a course screen this will
 * display a students current missions for the class they are currently looking at 
 */

const useStyles = makeStyles ((theme) => ({
    container: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
}));

let MissionsView = function({ className }) {
    const navigation = useNavigation();
    const [ view, setView ] = React.useState(0); // either show all mission or
     // just one mission and the tasks that make it up
    const [ missId, setMissId ] = React.useState("");
    const classes = useStyles();

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

    // takes in the task id and returns the current progression on the task
    let getTaskProgression = (id) => {
        const TASK_PROGRESSION_QUERY = gql
        `
        query {
            retr
        }
        `;

    }

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
                    <Paper style={{fontSize:18, fontWeight:'bold', justifyContent:'center',
                     display: 'flex', alignItems: 'center', width: 200, height: 150}} elevation={3}
                     onClick={() => clickHandler(mission.id)}>
                        {mission.name}
                    </Paper>
                );
            });

            return (
                <Grid style={{padding:16, marginTop: 32, marginLeft: 32}} 
                 container direction="row" justify="left" alignItems="center">
                    {missions}
                </Grid>
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
                        <ListItem divider button onClick={() => taskViewer(crMiss.id)}>
                            <div>
                                <ListItemText primary={crMiss.name}/>
                            </div>
                            {/* <div>
                                <CiruclarProgress variant="determinate" value={25}/>
                            </div> */}
                        </ListItem>
                    )
                } 
            }

            return (
                <div st>
                    <Button startIcon={<ArrowBackIosRoundedIcon/>}
                     color="primary" onClick={() => setView(0)}>Back to Missions</Button>
                    <List>
                        {taskList}
                    </List>
                </div>
            )
        }
    }

    return (
        <div className={classes.container}>
            {showCurr()}
        </div>
    )
}

export default MissionsView;