import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import StudentGridComponent from './StudentGrid';

export default function InstructorClassPage({route, navigation}) {
	const { className, teacher } = route.params; //change to instructor
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState(new Array()); //use React
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{className}</Text>
	  <StudentGridComponent
        students={students}
        setStudents={setStudents}
        filter={bubbleGridSelect}
        setFilter={setSelect}/>
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
  });