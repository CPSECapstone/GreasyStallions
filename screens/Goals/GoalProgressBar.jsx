import React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import  './GoalListStudent.css'

const useStyles = makeStyles({
   goalProgressLabel: {
      flex: '0 0 auto',
      padding:'0 10px 0 10px' 
   },
   goalProgressBar: {
      flex: '1 1 auto',
      padding:'0 10px 0 10px' 
   },
   goalProgressBarIcon: {
      flex: 'auto',
   },
 });

// Goal Progress Bar for GoalListStudent that hides on teacher view
let OverallGoalProgressBar = ({goalProgress, goalsLength, showBar}) => {
   const classes = useStyles();
   let goalProgressVal = goalProgress / goalsLength;

   return (
      <div>
         {showBar ?
            <ListItem key={-1} button>
               <ListItemText className={classes.goalProgressLabel}>
                  {"Overall Goal Progress: " + (Number((parseFloat(goalProgressVal)).toFixed(2)) * 100) + "%"}
               </ListItemText>
               <ListItemIcon className={classes.goalProgressBar}>
                  <Icon className={classes.goalProgressBarIcon}>
                     <ProgressBar 
                      progress={goalProgressVal}
                      color={Colors.red800}/>
                  </Icon>
               </ListItemIcon>
            </ListItem>
             : <div></div>}
      </div>
   )
}

export default OverallGoalProgressBar;