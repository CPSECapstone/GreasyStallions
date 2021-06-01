import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery, gql } from "@apollo/client";
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <TouchableOpacity>
                <Text>{target.targetName}</Text>
            </TouchableOpacity>
        )
    });

    return (
        <ScrollView>
             {targets}
        </ScrollView>
    );
}

export default LearningTaskVisualization;