import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Linking, Platform, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
//import config from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apolloClient } from './apollo';
import { apolloClientFlipted} from './apollo-flipted';


const LIST_USERS = gql

async function urlOpener(url, redirectUrl) {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
        url,
        redirectUrl
    );

    if (type === 'success' && Platform.OS === 'ios') {
        WebBrowser.dismissBrowser();
        return Linking.openURL(newUrl);
    }
}

Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-1:07057d76-612a-4045-8522-f38a759cf216',
      region: 'us-east-1',
      userPoolId: 'us-east-1_POfbbYTKF',
      userPoolWebClientId: '24sdf1brebo58s89ja0b63c51d',
      oauth: {
        domain: 'flipted-ios-test.auth.us-east-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'token'
      }
  }
});

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    getUser().then((userData) => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        getUser().then((userData) => setUser(userData));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then((userData) => userData)
            .catch(() => console.log('Not signed in'));
    }

    return (
        <View>
            <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
            {user ? (
                <Button title="Sign Out" onPress={() => Auth.signOut()} />
            ) : (
                <Button title="Federated Sign In" onPress={() => Auth.federatedSignIn()} />
            )}
            
        </View>
        
    );
}

export default App;

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