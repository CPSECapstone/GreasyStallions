import Analytics from "@aws-amplify/analytics";

const config = {
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
	},
	Analytics:{
		disabled: true
	}
  }
export default config;