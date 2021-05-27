import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import makeApolloClient from './apollo';
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, { Auth } from 'aws-amplify';
import config from './amplify/config';

Amplify.configure(config);

function App() {
  function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log('Not signed in'));
  }

  const [token, setToken]= React.useState();
  Auth.currentSession().then(res => {
    let accessToken = res.getAccessToken()
    let jwt = accessToken.getJwtToken()
    setToken(jwt);
    console.log(jwt);
    })

  const client = makeApolloClient(token);    


  return (
      <ApolloProvider client = {client}>
        <View style={styles.container}>
          <AppNavigation />
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
