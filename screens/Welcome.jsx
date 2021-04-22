import React, { useEffect, useState } from 'react';
import { Button, StyleSheet,  Linking, Platform, Text, View } from 'react-native';
//import Button from '../components/Button';
import BackgroundImage from '../components/BackgroundImage';
import { useLazyQuery, ApolloProvider, useQuery, gql} from '@apollo/client';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { apolloClientFlipted} from '../apollo-flipted';
import AsyncStorage from '@react-native-async-storage/async-storage';



const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;



var redirect = '';
const UserInfo = () => {
	const {data, error, loading} = useQuery(USER_ROLE);
	if (error) { console.log('Error fetching user', error); }
	let role = '';
	let email = '';
	if(data){
		console.log(data.getUser.role);
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
		  redirectSignIn: 'http://localhost:19006/',
		  redirectSignOut: 'http://localhost:19006/',
		  responseType: 'token'
		}
	}
  });

function Welcome({navigation}) {
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

	//function to access local storage setting
	const storeData = async (value) => {
		try {
		  await AsyncStorage.setItem('jwt_token', value)
		} catch (e) {
		  // saving error
		}
	  }

	Auth.currentSession().then(res=>{
		let accessToken = res.getAccessToken()
		let jwt = accessToken.getJwtToken()
		storeData(jwt);
	  })

	


	  //used to create spacing on the front end, will be changed when styling is updated
	  const Separator = () => (
		<View style={styles.separator} />
	  );

		//note that user here is the Cognito user, not our Table user
    return (
        <View>
            {user ? 
            (
			<View>
				<Separator/>
				<ApolloProvider client={apolloClientFlipted}>
					<UserInfo/>
				</ApolloProvider>
				<Separator/>
				<Button title = {"Hello " + JSON.stringify(user.attributes.email)}/>
				<Separator/>
				<Button title= "Go to Dashboard" onPress={() => {
					console.log("USER ROLE");
					console.log(JSON.stringify(user.attributes));
					if(redirect == "STUDENT"){navigation.navigate('Home')}
					if(redirect == "INSTRUCTOR"){navigation.navigate('InstructorHome')}
					}
						} color = 'green' />
				<Separator/>
				<Button title="Sign Out" onPress={() => {Auth.signOut()}} color = 'red'/>
			</View>) 
            : (<Button title="Sign In" onPress={() => {Auth.federatedSignIn()}} />)
            }
            
        </View>
        
    );
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
