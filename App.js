import React, { useEffect, useState } from 'react';
import {  ScrollView,  Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import makeApolloClient from './apollo';
import {Modal, Button, Image, Container, ListGroup, Form,  Col, Row} from 'react-bootstrap';
import flipted_icon from './assets/flipted_icon.jpg';
import flipted_logo from './assets/flipted_logo.jpg';
import {QuestionCircle} from 'react-bootstrap-icons';


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

function InfoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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

    //for info modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        <Image src={flipted_icon} rounded fluid />
        <Image src={flipted_logo} rounded fluid />
        <Button style={{width: 250, marginTop: 16, backgroundColor: '#3467EC', color:"white"}} 
          variant="primary" 
          size = "lg" 
          onClick = { () => Auth.federatedSignIn()}>
          Get Started
        </Button>
        <QuestionCircle style={{marginTop: 36}} 
          color="#3467EC" 
          size={36}
          onClick={handleShow}>
          </QuestionCircle>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to Flipted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Welcome to FliptEd Alpha Version. Press "Get started"
            to continue to the Authentication page, where you can Sign Up or Log In.
            You will then be redirected to your dashboard depending on your account type.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Got it!
            </Button>
          </Modal.Footer>
        </Modal>
      </View>
      )
    }
    else return( null);
    
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
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
