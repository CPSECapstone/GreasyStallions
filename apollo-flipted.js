import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';import { setContext } from '@apollo/link-context';
import Auth from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';


// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://knyio2nl7d.execute-api.us-east-1.amazonaws.com/dev/graphql'; 

//authentication. asyncAuthLink will run every time your request is made and use the token
//you provide while making the request.
var TOKEN = '';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('jwt_token')
    if(value !== null) {
      // value previously stored
      TOKEN = value;
    }
  } catch(e) {
    // error reading value
  }
}
getData();

const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});



const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClientFlipted = new ApolloClient({
  uri: 'https://knyio2nl7d.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
  link: httpLink,
  link: asyncAuthLink.concat(httpLink),
});
