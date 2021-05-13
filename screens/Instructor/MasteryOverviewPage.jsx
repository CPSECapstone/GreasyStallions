import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "./InstructorHome.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import {Typography, Grid, Box, Paper, List, ListItem, ListItemText,  Button} from '@material-ui/core';
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

//   const [bubbleGridSelect, setSelect] = React.useState('');
  const {className} = route.params;
  const [masteryProgress, setMasteryProgress] = useState({});

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
      masteryProgress = {masteryProgress}
      setMasteryProgress = {setMasteryProgress}
      navigation = {navigation}/>
    </View>
  );
}