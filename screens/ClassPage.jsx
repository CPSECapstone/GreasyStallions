import React from 'react';
import {Button, View, Text, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';


export default function ClassPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Classpage</Text>
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