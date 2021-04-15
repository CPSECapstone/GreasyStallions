import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';import { setContext } from '@apollo/link-context';
import Auth from 'aws-amplify';

// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://knyio2nl7d.execute-api.us-east-1.amazonaws.com/dev/graphql'; 
//will change this to the deployed graph later?


//uncomment the code below in case you are using a GraphQL API that requires some form of
//authentication. asyncAuthLink will run every time your request is made and use the token
//you provide while making the request.

//will make this dynamic later
const TOKEN = 'eyJraWQiOiJqOG4xTFwvZnRkeWlESlFkV0REWUZQVnpWZHY1R3pyMUdHSHcrcHJwOGJOST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmNDc1NmVhOS00NmExLTQ0ZmItYmZjNi04MjVjZTVlODk2MWMiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfUE9mYmJZVEtGX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjE4NTIyMzUwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9QT2ZiYllUS0YiLCJleHAiOjE2MTg2MDg2OTAsImlhdCI6MTYxODUyMjM1MCwidmVyc2lvbiI6MiwianRpIjoiYTA3ZjUyZDUtNzRkMi00YjU0LTg4MDctYjdlODk3OGJmZTFhIiwiY2xpZW50X2lkIjoiMjRzZGYxYnJlYm81OHM4OWphMGI2M2M1MWQiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMDU4MDEzNTI1MjI1MTQ5OTkyNzUifQ.G-5g9559OH7J_Hy-zjBgnfhmOa-84sCnnzSbKUrqPR4dam25Wq0ArV98X_n6HCsX9uKV9aLvD2LyZSMOJeD8EBC9pEFklIFR0pDIlfBg1-gg-jKCZsPt_4es_ZX8sKXdieIaYr-cAN1cZbIK7W4pC0qrwPcefvciqkq1njty4X2VQuOV3live0laLwMwMPMkxLaZZhI_Q6DJFigdTE5DLQJ70GDSKwfROqdPH93AKwga-WVdjnOQIO31by0Kh8S6ohjadqAa4KuRVsFLzQ44mORAE9XWVv7AQWucfE22oet5_cP2SjrK78QlOw8vGWsg4WWY-LSLItZytRREzo640w';


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
  uri: 'https://jikothj7j7.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
  link: httpLink,
  link: asyncAuthLink.concat(httpLink),
});
