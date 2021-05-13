import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import StudentGridComponent from './StudentGrid';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  Button} from '@material-ui/core';


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
    },
    section: {
      padding:16,
      justifyContent: 'top'
    }
  });

  export default function InstructorClassPage ({route, navigation}) {
    const { className, teacher } = route.params;
    const [bubbleGridSelect, setSelect] = React.useState('');
    const [students, setStudents] = useState([]);

  return (
    <View style = {styles.section}>
      <Typography align='center' variant="h4">
          <Box style={{marginLeft: 24, marginTop: 24}}fontWeight="fontWeightBold" m={1}>
            {className}
          </Box>
        </Typography>
      <StudentGridComponent
      students={students}
      setStudents={setStudents}
      navigation={navigation}
      filter={bubbleGridSelect}
      setFilter={setSelect}/>
    </View>
  );
}