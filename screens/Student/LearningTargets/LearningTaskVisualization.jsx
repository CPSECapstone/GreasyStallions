import React from 'react';
import { View } from 'react-native';
import { useQuery, gql } from "@apollo/client";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import './LearningTaskVisualization.css';

/**
 * Used to show a students mastery progress in a given class and lists their
 * current learning targets
 */

let LearningTaskVisualization = function({ className, navigation }) {
    const TARGETS_QUERY = gql
    `
    query {
        targets(course: "${className}") {
            targetName
            description
        }
    }
    `;

    const { data, error, loading } = useQuery(TARGETS_QUERY);
    if (loading) {
        return <View/>
    }

    let targets = [];
    data.targets.forEach( target => {
        targets.push(
            <Card classes={{root: "singleTarget"}}>
                <CardContent>
                    <Typography class="cardTitleText" variant="h3" component="h3">
                        {target.targetName}
                    </Typography>
                </CardContent>
            </Card>
        )
    });

    return (
        <Grid style={{margin: 20, marginTop: 32, marginLeft: 32}} 
         container direction="row" justify="left" alignItems="center">
             {targets}
        </Grid>
    );
}

export default LearningTaskVisualization;