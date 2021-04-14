import React, { useEffect, useState } from 'react';
import { Button, StyleSheet,  Linking, Platform, Text, View } from 'react-native';
//import Button from '../components/Button';
import BackgroundImage from '../components/BackgroundImage';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import Amplify, { Auth, Hub } from 'aws-amplify';



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
		  redirectSignIn: 'http://localhost:19006/',
		  redirectSignOut: 'http://localhost:19006/',
		  responseType: 'token'
		}
	}
  });

const Separator = () => (
	<View style={styles.separator} />
  );

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

	console.log('Right here');
	Auth.currentSession().then(res=>{
		let accessToken = res.getAccessToken()
		let jwt = accessToken.getJwtToken()
		//You can print them to see the full objects
		console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
		console.log(`myJwt: ${jwt}`)
	  })
	

    return (
        <View>
            <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
            {user ? 
            (
			<View>
				<Separator/>
				<Button title = {"Hello " + JSON.stringify(user.attributes.name)}/>
				<Separator/>
				<Button title= "Go to Dashboard" onPress={() => navigation.navigate('Home')} color = 'green' />
				<Separator/>
				<Button title="Sign Out" onPress={() => Auth.signOut()} color = 'red'/>
			</View>) 
            : (<Button title="Federated Sign In" onPress={() => Auth.federatedSignIn()} />)
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
