import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useQuery, gql, useApolloClient} from '@apollo/client';
import {} from '@apollo/client/react/hooks'


export default function MasteryStudentList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>mastery student list</Text>
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