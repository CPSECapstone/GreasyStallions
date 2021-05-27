import React, { useState } from 'react';
import { View } from 'react-native';
import "./InstructorHome.css";
import StudentGridComponent from './StudentGrid';
//import {Typography, Box,  Button} from '@material-ui/core';

  // The landing page for a teacher when they click into a course
  // from their home page
  export default function InstructorClassPage ({route, navigation}) {
    const { className, teacher } = route.params; //change to instructor
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState([]); //use React

  return (
    <View class="section">
      <Typography align='center' variant="h4">
        <Box style={{marginLeft: 24, marginTop: 24}}fontWeight="fontWeightBold" m={1}>
          {className}
        </Box>
      </Typography>
      <Button 
      style={{margin: "1%"}}
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('MasteryOverviewPage', {className: className})}}>
         Mastery
      </Button>
        <Button 
        style={{margin: "1%"}}
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('GoalPage', {user: teacher})}}>
         Goal Page
      </Button>
      <StudentGridComponent
        students={students}
        setStudents={setStudents}
        navigation={navigation}
        filter={bubbleGridSelect}
        setFilter={setSelect}/>
    </View>
  );
}