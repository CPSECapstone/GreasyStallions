import React from 'react';
import { View } from 'react-native';
import { useQuery, gql } from "@apollo/client";
import { Grid, Paper } from "@material-ui/core";

/**
 * This is going to be used to fill the components on a course screen this will
 * display a students current missions for the class they are currently looking at 
 */
let MissionsView = function({ className, navigation }) {;

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

    const { data, error, loading } = useQuery(MISSION_QUERY);
    if (loading) {
        return <View/>
    }



    let missions = [];
    data.courseContent.missions.forEach( mission => {
        missions.push(
            <Paper style={{fontSize:18, fontWeight:'bold', justifyContent:'center',
             display: 'flex', alignItems: 'center', width: 200, height: 150}} elevation={3}>
                {mission.name}
            </Paper>
        )
    });


    return (
        <Grid style={{padding:16, marginTop: 32, marginLeft: 32}} 
         container direction="row" justify="left" alignItems="center">
             {missions}
        </Grid>
    )
}

export default MissionsView;