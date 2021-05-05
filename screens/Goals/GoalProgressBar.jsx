import React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import  './GoalListStudent.css'

// Goal Progress Bar for GoalListStudent that hides on teacher view
let OverallGoalProgressBar = ({goalProgress, goalsLength, showBar}) => {
   let goalProgressVal = goalProgress / goalsLength;
   return (
      <div>
         {showBar ?
            <ListItem container>
               <ListItemText>
                  {"Overall Goal Progress: " + (Number((parseFloat(goalProgressVal)).toFixed(2)) * 100) + "%"}
               </ListItemText>
               <ListItemIcon>
                  <Icon>
                  <ProgressBar 
                   progress={goalProgressVal}
                   color={Colors.red800} />
                  </Icon>
               </ListItemIcon>
            </ListItem>
             : <div></div>}
      </div>
   )
}

export default OverallGoalProgressBar;