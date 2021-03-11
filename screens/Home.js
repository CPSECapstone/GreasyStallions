import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

import { apolloClientFlipted} from '../apollo-flipted';
import { ApolloProvider, useQuery, gql} from '@apollo/client';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "10%",
    height: "10%",
    justifyContent: 'top',
    alignItems: 'center',
    alignSelf: 'right'
  },
  text: {
    textAlign: 'center'
  }
});


const LIST_USERS = gql
`
   query{getUsers{fname lname}}
`;

const FliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_USERS);

  if (error) { console.log('Error fetching users', error); }

  return (
    <View style = {styles.section}>
      <Text style={styles.starshipName}>Hello</Text>
      <Text style={styles.starshipName}>Flipted</Text> 
    </View>
  );
  //issue is that data is null
}


export default function Home({ signOut }) {
  return (
    <View style={styles.header}>
      <ApolloProvider client={apolloClientFlipted}>
        <FliptedComponent />
      </ApolloProvider>
      <Text style={styles.text}>You are now authenticated</Text>
      <Button style={{width:100,backgroundColor:'#99004d',marginTop:20,}}
              onPress={() => signOut()}>
                <Text style={{marginLeft:0,alignSelf:'center'}}>Sign Out</Text>
      </Button>
    </View>
    
    

  )
}