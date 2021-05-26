import React from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';

export default function GoalPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GoalPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  textAlign: 'center'
	},
  });