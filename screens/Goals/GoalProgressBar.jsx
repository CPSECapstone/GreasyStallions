import React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import { LIST_ALL_GOALS } from './GoalQueries'
import { useApolloClient } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import  './GoalListStudent.css'

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
   const client = useApolloClient();
   const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
   let goalProgressVal = 0;
   let completedGoals = 0;

   getAllGoals.forEach((goal) => {
      if(!goal.subGoals.length){
         goal.completed && completedGoals++;
      } else{
         let reducer = (acc, cv) => cv.completed ? acc + 1 : acc;
         let subCompleted = goal.subGoals.reduce(reducer, 0)
         if(subCompleted === goal.subGoals.length){
            completedGoals++;
         }
      }
   })
   goalProgressVal = completedGoals / getAllGoals.length;

   return (
      <div>
         {showBar ?
            <ListItem key={-1} button>
               <ListItemText className={classes.goalProgressLabel}>
                  {"Overall Goal Progress: " + 
                   (Number((parseFloat(goalProgressVal)).toFixed(2)) * 100) 
                    + "%"}
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