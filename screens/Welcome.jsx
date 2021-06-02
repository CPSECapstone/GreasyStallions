import React from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';
import { useLazyQuery, ApolloProvider, useQuery, gql} from '@apollo/client';

const USER_ROLE = gql
`
{getUser{
	role
	email
  }}
`;


export default function Welcome({navigation}) {
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
		navigation.navigate('Courses');
	}
	else if(role == 'STUDENT'){
    	navigation.navigate('StudentHome');
	}
    return (
        <View>
        </View>
        
    );

}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  textAlign: 'center'
	},
  });