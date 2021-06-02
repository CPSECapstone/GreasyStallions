import React from 'react';
import { View, ScrollView } from 'react-native';
import { useQuery, gql } from "@apollo/client";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text, Menu, Divider, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles  from '../../../styles/styles.js';

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
                                {target.targetName}
                            </Text>
                            )
                        }
                    </AnimatedCircularProgress>
        )
    });

    return (
        <View style = {Styles.grid}>
             {targets}
        </View>
    );
}

export default LearningTaskVisualization;