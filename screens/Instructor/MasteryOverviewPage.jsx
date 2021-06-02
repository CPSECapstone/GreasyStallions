import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import MasteryStudentListComponent from './MasteryStudentList';
import { ApolloProvider, useQuery, gql} from '@apollo/client';

export default function MasteryOverviewPage({route, navigation}) {
  const {className} = route.params;
  const [students, setStudents] = useState({});
  const [masteryFilter, setMasteryFilter] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{className}</Text>
	  	<Button 
		  title='Bubble View'
			style={styles.navbutton}
			color='#841584'
			onPress={() => {navigation.navigate('InstructorClassPage', {className: className})}}>
		</Button>
	  <MasteryStudentListComponent
      students = {students}
      setStudents = {setStudents}
      filter = {masteryFilter}
      setFilter = {setMasteryFilter}/>
    </View> 
  )
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
	navbutton: {
		margin:10,
	}
  });