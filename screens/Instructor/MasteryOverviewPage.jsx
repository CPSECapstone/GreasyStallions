import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import MasteryStudentListComponent from './MasteryStudentList';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import ObjectiveMasteryComponent from './ObjectiveMastery';
import TaskMasteryComponent from './TaskMastery';

export default function MasteryOverviewPage({route, navigation}) {
  const {className} = route.params;
  const [students, setStudents] = useState({});
  const [masteryFilter, setMasteryFilter] = useState('');
  const [showTargetMastery, setShowTargetMastery] = useState(true)
  const [showObjMastery, setShowObjMastery] = useState(false)
  const [objSelected, setObjSelected] = useState('')


  if(showTargetMastery){
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
		setFilter = {setMasteryFilter}
		setShowTargetMastery = {setShowTargetMastery}
		setShowObjMastery = {setShowObjMastery}/>
		</View> 
  	)
  }else if (showObjMastery){
	return (
		<View style={styles.container}>
		<Text style={styles.text}>{className}</Text>
			<Button 
			title='Bubble View'
				style={styles.navbutton}
				color='#841584'
				onPress={() => {navigation.navigate('InstructorClassPage', {className: className})}}>
			</Button>
		<ObjectiveMasteryComponent
		students = {students}
		setStudents = {setStudents}
		filter = {masteryFilter}
		setFilter = {setMasteryFilter}
		setShowTargetMastery = {setShowTargetMastery}
		setShowObjMastery = {setShowObjMastery}
		setObjSelected = {setObjSelected}/>
		</View> 
  	)
  } else{
	return (
		<View style={styles.container}>
		<Text style={styles.text}>{className}</Text>
			<Button 
			title='Bubble View'
				style={styles.navbutton}
				color='#841584'
				onPress={() => {navigation.navigate('InstructorClassPage', {className: className})}}>
			</Button>
		<TaskMasteryComponent
		students = {students}
		setStudents = {setStudents}
		filter = {masteryFilter}
		setFilter = {setMasteryFilter}
		setShowTargetMastery = {setShowTargetMastery}
		setShowObjMastery = {setShowObjMastery}
		objSelected = {objSelected}/>
		</View> 
  	)
  }
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