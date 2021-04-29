import React, { useState } from 'react';
import { ScrollView, Button, Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
//import config from './aws-exports';
import Amplify from '@aws-amplify/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apolloClient } from './apollo';
import { apolloClientFlipted} from './apollo-flipted';

//Amplify.configure(config);

const LIST_USERS = gql
`
    query{getUsers{fname lname}}
`;

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigation />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  label: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  section: {
    marginVertical: 12,
  },
  starshipName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  starshipModel: {
    fontStyle: 'italic',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});