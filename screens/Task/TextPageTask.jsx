import React from 'react';
import {Text,  Surface, Title, Paragraph} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import  Styles  from '../../styles/styles';

/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ title, text, size }) {
    
    return (
        <View style={Styles.taskContainer}>
			<Title style={Styles.taskTitleText}>{title}</Title>
			<Paragraph>{text}</Paragraph>
        </View>
    );
}

export default TextPageTask;
