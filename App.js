import React, { useEffect, useState } from 'react';
import { Image, ScrollView,  Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import Amplify, { Auth, Hub } from 'aws-amplify';
import makeApolloClient from './apollo';
import {Dialog, DialogContent, DialogTitle, Grid, Container, Button} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';
import fliptedlogo from './assets/fliptedlogo.PNG';
import fullfliptedlogo from './assets/fullfliptedlogo.PNG';
import config from './amplify/config';

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
	Auth.currentSession().then(res=>{
		let accessToken = res.getAccessToken()
		let jwt = accessToken.getJwtToken()
    setToken(jwt);
	  })

    
  const client = makeApolloClient(token);    

	const [ShowInfo, setShowInfo] = useState(false);
	function openDialog() {
        setShowInfo(true);
    }

    if(user){return(
      <ApolloProvider client = {client}>
        <View style={styles.container}>
            <AppNavigation />
            <StatusBar style="auto" />
          </View>
          </ApolloProvider>)
    }
    else if(!user){return(
      <View style = {styles.loadingContainer}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center">          
          <Image style = {{width:100, height:100, marginBottom: 32, marginTop: -100}} source={fliptedlogo}/>
          <Image style = {{width:400, height:120}} source={fullfliptedlogo}/>
          <Button style={{width: 250, marginTop: 32, backgroundColor: '#3467EC', color:"white"}} 
            onClick = { () => Auth.federatedSignIn()}>
            Get Started
          </Button>
          <HelpIcon onClick = { () => openDialog()} style = {{marginTop: 32, color: '#3267EF'}} fontSize = 'large'></HelpIcon>
          <Dialog open={ShowInfo} >
			<DialogTitle>Welcome to FliptEd!</DialogTitle>
            <DialogContent>Select "Get Started" to begin. Sign in with
				your FliptEd account or create a new one. You will be
				automatically directed to your dashboard.
			</DialogContent>
			<Button style={{marginBottom: 16, alignSelf: 'center', width: 250, marginTop: 32, backgroundColor: '#3467EC', color:"white"}} 
				onClick = { () => setShowInfo(false)}>
				Got it!
			</Button>
		  </Dialog>
        </Grid>
      </View>
      )
    }
    else return(null);
    
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'top',
    marginTop: 50
  },
  container2: {
    width: 300,
    flex: 1,
    justifyContent: 'top',
    marginTop: 75,
    alignItems: 'center'
  },
  helpButton: {
    flex: 1,
    justifyContent: 'top',
    alignSelf: 'middle',
    marginTop: 16
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
