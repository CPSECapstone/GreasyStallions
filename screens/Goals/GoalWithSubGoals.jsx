import React , { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import { ProgressBar, Colors } from 'react-native-paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
   goalListRoot:{
      'background-color': 'white',
   }
 });


let GoalWithSubGoals = ({goal, editGoal, idx, subGoalCmps}) => {
   const classes = useStyles();
   const [goalOpen, setGoalOpen] = useState(false);
   let reducer = (acc, cv) => cv.completed ? acc + 1 : acc;
   let subCompleted = goal.subGoals.reduce(reducer, 0)
   let progress = subCompleted / goal.subGoals.length;
   let subGoalCmp = [];

   subGoalCmp.push(
      <ListItem 
       key={idx + " goal"} 
       button 
       onClick={() => {setGoalOpen(!goalOpen)}}>
         <ListItemText 
            primary={goal.title}
            className={classes.goalWithSubsName}/>
         <ListItemText 
            primary={"due by: " + goal.dueDate}
            className={classes.goalWithSubsDue}/>
         <ListItemIcon className={classes.goalWithSubsProgressBar}>
            <Icon className={classes.goalWithSubsProgressBarIcon}>
               <ProgressBar progress={progress} color={Colors.red800} />
            </Icon>
         </ListItemIcon>
         {!goalOpen ? <ExpandLess /> : <ExpandMore />}
         <ListItemSecondaryAction>
            <IconButton 
               edge="end" 
               aria-label="edit"
               onClick={() => editGoal(idx)}>
               <EditIcon />
            </IconButton>
         </ListItemSecondaryAction>
      </ListItem>)
   subGoalCmp.push(
      <Collapse in={goalOpen} timeout="auto" unmountOnExit>
         <List>
            {subGoalCmps}
         </List>
      </Collapse>)
   return subGoalCmp
}

export default GoalWithSubGoals