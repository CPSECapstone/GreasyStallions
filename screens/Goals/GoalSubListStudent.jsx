import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import  './GoalListStudent.css'

const useStyles = makeStyles({
   subGoalComplete: {
      flex: '0 1 auto',
      padding:'0 10px 0 10px' 
   },
 });


let GoalSubListStudent = ({subGoal, completeSubGoal,
 completeSubGoalTeacher, idx, subIdx, teacher, studentIdx}) => {
   const classes = useStyles();


   return (
   <ListItem key={idx + " " + subIdx + " subGoal"} button>
      <ListItemText >{subGoal.title}</ListItemText>
      <ListItemText 
       className={classes.subGoalComplete}> 
         {"due by: "+ subGoal.dueDate}
      </ListItemText>
      <ListItemText className={classes.subGoalComplete}>
         Complete
      </ListItemText>
      <ListItemIcon className={classes.subGoalComplete}>
         <Checkbox
          edge="start"
          color="primary"
          onChange={teacher ?
            completeSubGoalTeacher : completeSubGoal}
          checked={subGoal.completed}
          id={idx + " " + subIdx + 
           (teacher ? " " + studentIdx : "")}
         />
      </ListItemIcon>
   </ListItem>)
};

export default GoalSubListStudent;