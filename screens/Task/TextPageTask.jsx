import React from 'react';
import {Text,  Surface} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';


/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ title, text, size }) {
    
    return (
        <View>
			<Text>{title}</Text>
			<Text>{text}</Text>
        </View>
    );
}

export default TextPageTask;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	  }
  });