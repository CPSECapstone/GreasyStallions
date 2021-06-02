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
            <Surface style={styles.surface}>
				<Text>{title}</Text>
				<Text>{text}</Text>
			</Surface>
        </View>
    );
}

export default TextPageTask;

const styles = StyleSheet.create({
	surface: {
	  padding: 8,
	  alignItems: 'center',
	  justifyContent: 'center',
	  elevation: 4,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	  }
  });