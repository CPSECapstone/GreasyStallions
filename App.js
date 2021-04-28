import React, { useEffect, useState } from 'react';
import { ScrollView, Button, Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import makeApolloClient from './apollo';



Amplify.configure({
	Auth: {
		identityPoolId: 'us-east-1:07057d76-612a-4045-8522-f38a759cf216',
		region: 'us-east-1',
		userPoolId: 'us-east-1_POfbbYTKF',
		userPoolWebClientId: '24sdf1brebo58s89ja0b63c51d',
		oauth: {
		  domain: 'flipted-ios-test.auth.us-east-1.amazoncognito.com',
		  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
		  redirectSignIn: 'http://localhost:19006/',
		  redirectSignOut: 'http://localhost:19006/',
		  responseType: 'token'
		}
	}
  });

export default function App() {

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

  const [token, setToken]= React.useState();
	Auth.currentSession().then(res=>{
		let accessToken = res.getAccessToken()
		let jwt = accessToken.getJwtToken()
    setToken(jwt);
	  })
    console.log(token);

    
    const client = makeApolloClient(token);    


    if(user){return(
      <ApolloProvider client = {client}>
        <View style={styles.container}>
            <AppNavigation />
            <StatusBar style="auto" />
          </View>
          </ApolloProvider>)
    }
    else if(!user){return(<View>
        <Button title="Sign In" onPress={() => {Auth.federatedSignIn()}} />
        </View>)
    }
    else return( null);
    
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


