import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default function GoalListTeacher() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>goallistteacher</Text>
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