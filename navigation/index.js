import React from 'react';
import {
  StyleSheet, View, ActivityIndicator,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AuthLoadingScreen extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    );
  }
}


export default AuthLoadingScreen;