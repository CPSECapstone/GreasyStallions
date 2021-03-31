import React, { useState } from 'react';
import { ScrollView, Button, Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation';
import config from './aws-exports';
import Amplify from '@aws-amplify/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apolloClient } from './apollo';
import { apolloClientFlipted} from './apollo-flipted';

Amplify.configure(config);

const LIST_USERS = gql
`
    query{getUsers{fname lname}}
`;
/*
const FliptedComponent = () => {
  const {data, error, loading} = useQuery(LIST_USERS);
  console.log(data);
  //console.log(Object.keys(data));
  //const user1 = data.getUsers
  //const user1name = 'yo';
  if (error) { console.log('Error fetching users', error); }


  let students = [];
  if(data){
  data.getUsers.forEach( usr =>{
    students.push(<Text style={styles.label}> {usr.fname + " " + usr.lname}</Text>)
  });
  }
  
  return (
    <View style = {styles.container}>
      {students}
    </View>
  );

}*/
/*
export default function App() {
  return (
    <ApolloProvider client={apolloClientFlipted}>
      <FliptedComponent />
    </ApolloProvider>
  );
}*/
// this is for the sign in stuff remove ^
export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigation />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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


// Imperial I-class Star Destroyer
/*
const defaultStarshipId = 'c3RhcnNoaXBzOjM=';
*/
/*
function RootComponent() {
  const [starshipId, setStarshipId] = useState(defaultStarshipId);
  const { data, error, loading } = useQuery(GET_STARSHIP, {
    variables: { id: starshipId },
  });

  if (error) { console.log('Error fetching starship', error); }

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        Example app from react native template, leaving for syntax reference
        <StarshipPicker
          starshipId={starshipId}
          onStarshipChange={setStarshipId}
        />
      </View>
      {loading ? (
        <ActivityIndicator color='#333' />
      ) : (
        <StarshipDetails starship={data.starship} />
      )}
    </View>
  );
}

function StarshipPicker(props) {
  const { data, error, loading } = useQuery(LIST_STARSHIPTS);

  if (error) { console.log('Error listing starships', error) }
  if (loading) return null;

  const { starships } = data.allStarships;

  return (
    <Picker
      selectedValue={props.starshipId}
      onValueChange={props.onStarshipChange}
    >
      {starships.map(starship => (
        <Picker.Item key={starship.id} label={starship.name} value={starship.id} />
      ))}
    </Picker>
  )
}

function StarshipDetails({ starship }) {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.starshipName}>{starship.name}</Text>
        <Text style={styles.starshipModel}>{starship.model}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Operational abilities</Text>
        <Text>- {starship.crew} crew members</Text>
        <Text>- {starship.consumables} without restocking</Text>
      </View>

      <View>
        <Text style={styles.label}>Ship attributes</Text>
        <Text>- {starship.length}m long</Text>
        <Text>- {starship.costInCredits} credits</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Manufacturers</Text>
        {starship.manufacturers.map(manufacturer => (
          <Text key={manufacturer}>- {manufacturer}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Appeared in</Text>
        {starship.filmConnection.films.map(film => (
          <Text key={film.id}>- {film.title}</Text>
        ))}
      </View>
    </>
  )
}

*/
/*

const LIST_STARSHIPTS = gql`
  query listStarships {
    allStarships {
      starships {
        id
        name
      }
    }
  }
`;

const GET_STARSHIP = gql`
  query getStarship($id: ID!) {
    starship(id: $id) {
      id
      name
      model
      starshipClass
      manufacturers
      length
      crew
      costInCredits
      consumables
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
`;
*/

