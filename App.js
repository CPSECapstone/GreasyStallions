import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import Amplify, { Auth, Hub } from 'aws-amplify';
import makeApolloClient from './apollo';
import {Dialog, DialogContent, DialogTitle, Grid, Button} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';
import config from './amplify/config';
import { registerRootComponent } from 'expo';


Amplify.configure(config);

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
	Auth.currentSession().then(res => {
		let accessToken = res.getAccessToken()
		let jwt = accessToken.getJwtToken()
    setToken(jwt);
    console.log(jwt);
  })

    
  const client = makeApolloClient(token);    

	const [ShowInfo, setShowInfo] = useState(false);
	function openDialog() {
    setShowInfo(true);
  }

    if(user){return(
      <View>
        <ApolloProvider client = {client}>
          <View >
              <AppNavigation />
              <StatusBar style="auto" />
            </View>
        </ApolloProvider>
      </View>)
    }
    else if(!user){
      return(
      <View>
        <Grid
          container
          direction="column">          
          <Button onClick={() => Auth.federatedSignIn()}>
            <Text>
              {"Get Started"}
            </Text>
          </Button>
          <HelpIcon onClick={ () => openDialog()} fontSize = 'large'></HelpIcon>
          <Dialog open={ShowInfo} >
            <DialogTitle>Welcome to FliptEd!</DialogTitle>
            <DialogContent>
              <Text>
                {"Select \"Get Started\" to begin. Sign in with \
                your FliptEd account or create a new one. You will be\
                automatically directed to your dashboard."}
              </Text>
            </DialogContent>
            <Button 
              onClick = { () => setShowInfo(false)}>
              <Text>
                {"Got it!"}
              </Text>
            </Button>
          </Dialog>
        </Grid>
      </View>
      )
    }
    else return(<View></View>);
    
}
registerRootComponent(App);

