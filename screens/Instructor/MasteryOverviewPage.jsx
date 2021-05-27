import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import { ApolloProvider, useQuery, gql} from '@apollo/client';
//import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  Button} from '@material-ui/core';
import MasteryStudentListComponent from './MasteryStudentList';

const styles = StyleSheet.create({
    header: {
      marginLeft: 50,
      flex: 1,
      width: "100%",
      justifyContent: 'top',
      alignItems: 'left',
      alignSelf: 'center'
    },
    text: {
      textAlign: 'left',
      fontSize: 28,
      fontStyle: 'bold',
      paddingTop: 20
    }
  });

  export default function MasteryOverviewPage ({route, navigation}) {

  const {className} = route.params;
  const [students, setStudents] = useState({});
  const [masteryFilter, setMasteryFilter] = useState('');

  return (
    <View style = {styles.section}>
      <Typography align='center' variant="h4">
          <Box style={{marginLeft: 24, marginTop: 24}}fontWeight="fontWeightBold" m={1}>
            {className}
          </Box>
        </Typography>
        <Button 
        style={{margin: "1%"}}
       color="primary"
       variant="contained"
       onClick={() => {navigation.navigate('InstructorClassPage', {className: className})}}>
         Bubble View
      </Button>
      <MasteryStudentListComponent
      students = {students}
      setStudents = {setStudents}
      filter = {masteryFilter}
      setFilter = {setMasteryFilter}
      navigation = {navigation}/>
    </View>
  );
}