import React, { useState } from 'react';
import MasteryStudentListComponent from './MasteryStudentList';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import ObjectiveMasteryComponent from './ObjectiveMastery';
import TaskMasteryComponent from './TaskMastery';
import Styles from '../../styles/styles';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Divider, List, Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'

export default function MasteryOverviewPage({route, navigation}) {
  const {className} = route.params;
  const [students, setStudents] = useState({});
  const [masteryFilter, setMasteryFilter] = useState('');
  const [showTargetMastery, setShowTargetMastery] = useState(true)
  const [showObjMastery, setShowObjMastery] = useState(false)
  const [objSelected, setObjSelected] = useState('')


  if(showTargetMastery){
	return (
		<View style={Styles.container}>
		<Text style={Styles.header}>{className}</Text>
		<TouchableOpacity style = {Styles.coursebutton} onPress={() => navigation.navigate('InstructorClassPage', {className: className})}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
					<Text style = {Styles.webTitleText}>Mission View</Text>
					<Ionicons style = {Styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
				</View>
				<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
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
		<View style={Styles.container}>
		<Text style={Styles.header}>{className}</Text>
		<TouchableOpacity style = {Styles.coursebutton} onPress={() => navigation.navigate('InstructorClassPage', {className: className})}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
					<Text style = {Styles.webTitleText}>Mission View</Text>
					<Ionicons style = {Styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
				</View>
				<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
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
  } else{ //task mastery
	return (
		<View style={Styles.container}>
		<Text style={Styles.header}>{className}</Text>
		<TouchableOpacity style = {Styles.coursebutton} onPress={() => navigation.navigate('InstructorClassPage', {className: className})}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
					<Text style = {Styles.webTitleText}>Mission View</Text>
					<Ionicons style = {Styles.carrot} name="md-arrow-forward" size={32} color='#3467EC'/>
				</View>
				<Divider style = {{marginTop:6}}/>
		</TouchableOpacity>
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