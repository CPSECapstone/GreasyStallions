import React , { useState } from 'react';
import { ProgressBar, Colors, IconButton } from 'react-native-paper';
import { List } from 'react-native-paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({ 
   goalWithSubsName: {
      flex: '0 0 auto',
      padding:'0 10px 0 10px' 
   },
   goalWithSubsDue: {
      flex: '1 0 auto',
      padding:'0 10px 0 10px' 
   },
   goalWithSubsProgressBar: {
      flex: '1 1 auto',
      padding:'0 10px 0 10px' 
   },
   goalWithSubsProgressBarIcon: {
      flex: 'auto',
   },
   endIcons: {
      display: "flex"
   },
   goalListRoot:{
      'background-color': 'white',
   }
 });


let GoalWithSubGoals = ({goal, editGoal, idx, subGoalCmps, favGoal}) => {
   const classes = useStyles();
   let reducer = (acc, cv) => cv.completed ? acc + 1 : acc;
   let subCompleted = goal.subGoals.reduce(reducer, 0)
   let progress = subCompleted / goal.subGoals.length;
   let subGoalCmp = [];
      subGoalCmp.push(
         <List.Accordion
          title={goal.title}
          description={"Due by: " + goal.dueDate + 
           " With " + goal.subGoals.length +  " subGoals"}
          right={() => {
            [
            <IconButton
               color={Colors.blue500} 
               onPress={() => favGoal(idx)}
               icon={goal.favorited ? "star" : "star-outline"}/>,
            <IconButton 
               color={Colors.blue500} 
               icon={"pencil"}
               onPress={() => editGoal(idx)}/>]}}>
            {subGoalCmps}
         </List.Accordion>
      )
   return subGoalCmp
}

export default GoalWithSubGoals