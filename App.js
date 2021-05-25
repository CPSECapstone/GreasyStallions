import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import config from './aws-exports';
import Amplify from '@aws-amplify/core';

import { apolloClient } from './apollo';
import { apolloClientFlipted} from './apollo-flipted';

Amplify.configure(config);


export default function App() {
  
  return (
    <View style={styles.container}>
      <AppNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
