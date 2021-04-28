import React, { useEffect, useState } from 'react';
import { Button, StyleSheet,  Linking, Platform, Text, View } from 'react-native';
//import Button from '../components/Button';
import BackgroundImage from '../components/BackgroundImage';
import { useLazyQuery, ApolloProvider, useQuery, gql} from '@apollo/client';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';



const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;


/*
var redirect = '';
var role = '';
var email = '';
const UserInfo = () => {
	const {data, error, loading} = useQuery(USER_ROLE);
	if (error) { console.log('Error fetching user', error); }
	if(data){
		email = data.getUser.email;
		role = data.getUser.role;
		redirect = data.getUser.role;
	}

	return (
	  <View style = {styles.section}>
		<Text style = {styles.text}>Email: {email}</Text>
		<Text>Role: {role}</Text>
	  </View>
	);
  }
*/
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



function Welcome({navigation}) {
	var redirect = '';
	var role = '';
	var email = '';
	const {data, error, loading} = useQuery(USER_ROLE);
	if (error) { console.log('Error fetching user', error); }
	if(data){
		email = data.getUser.email;
		role = data.getUser.role;
		redirect = data.getUser.role;
	};
	console.log(role);
	
	if(role == 'INSTRUCTOR'){
		navigation.navigate('InstructorHome');
	}
	else if(role == 'STUDENT'){
    	navigation.navigate('Home');
	}
    return (
        <View>
           <Text>Loading...</Text>
		   <Text>Email: {email}</Text>
		   <Text>role: {role}</Text>
		   <Button title = 'Sign Out' color = 'red'
              onPress={() => Auth.signOut()}>
      		</Button>
        </View>
        
    );
	//navigation.navigate('Home');

}


export default Welcome;


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	},
	image: {
	  flex: 1,
	  justifyContent: 'center',
	},
	content: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	title: {
	  fontSize: 22,
	  margin: 10,
	  textTransform: 'uppercase',
	  textAlign: 'center',
	  marginBottom: 20,
	  fontWeight: '800',
	  color: 'white',
	  textShadowColor: 'rgba(0, 0, 0, 0.95)',
	  padding: 15,
	  textShadowOffset: { width: -1, height: 1 },
	  textShadowRadius: 10,
	},
	button: {
	  marginTop: 10,
	  marginBottom: 10,
	  paddingBottom: 16
	},
	separator: {
		marginVertical: 16
	  }
  });
