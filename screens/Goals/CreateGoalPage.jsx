import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

import './CreateGoalPage.css';

const useStyles = makeStyles((theme) => ({
   container: {
     display: 'flex',
     flexWrap: 'wrap',
   },
   textField: {
     marginLeft: theme.spacing(1),
     marginRight: theme.spacing(1),
     width: 200,
   },
 }));

let CreateGoalPage = ({route, navigation}) => {
   const { name, due, subGoalsIn, idx, setGoals, goals, teacher } = route.params
   const [goalName, setGoalName] = useState(name ? name : "")
   const [dueDate, setDueDate] = useState(due ? due : new Date('2014-08-18T21:11:54'))
   const [subGoals, setSubGoals] = useState(subGoalsIn ? subGoalsIn : [])
   const classes = useStyles();

   let subGoalCmps = []

   let addSubGoal = () => {
      setSubGoals(subGoals.concat([{title:""}]))
   }

   const handleChange = (ev) => {
      let newSubGoals = [...subGoals];
      newSubGoals[ev.target.id].title = ev.target.value;
      setSubGoals(newSubGoals);
   }

   const handleGoalTitleChange = (ev) =>{
      setGoalName(ev.target.value);
   }

   const handleDateChange = (ev) => {
      setDueDate(ev.target.value);
   };

   let submit = () => {
      let finalGoal = {
         name: goalName,
         due: dueDate,
      };
      let tempGoal = [...goals];

      if (subGoals.length) {
         finalGoal.subCompleted = goals[idx] && 
          !isNaN(goals[idx].subCompleted) ? 
          goals[idx].subCompleted : 0;
         finalGoal.subGoals = subGoals
         
      } else {
         finalGoal.complete = goals[idx] &&
          goals[idx].complete ? 
          goals[idx].complete : false;
      }
      if (!isNaN(idx)) {
         tempGoal[idx] = finalGoal;
      } else {
         tempGoal = tempGoal.concat([finalGoal]);
      }
      setGoals(tempGoal);
      navigation.navigate(teacher ? 'InstructorHome' : 'ClassPage');
   }

   let goalValid = () => {
      return goalName.length && dueDate.length;
   };

   let deleteSubGoal = (ev) => {
      let subGoalsTemp = [...subGoals];
      subGoalsTemp.splice(ev.currentTarget.id, 1)
      setSubGoals(subGoalsTemp)
   }



   subGoals.forEach((goal, idx) => {

      let subGoalCmp = 
         <ListItem key={idx}>
            <ListItemIcon>
               <TextField 
                id={idx}
                defaultValue={goal.title} 
                value={goal.title} 
                onChange={handleChange}
                type="text"
                label="Subgoal Title"/>
            </ListItemIcon>
            <ListItemSecondaryAction>
               <IconButton 
                edge="end" 
                id={idx}
                aria-label="delete"
                onClick={deleteSubGoal}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
      subGoalCmps.push(subGoalCmp)
      subGoalCmps.push(<Divider light />);
   });


   return(
      <View className={"center"}>
         <h2>{isNaN(idx)? "Make Goal" : "Edit Goal"}</h2>
         <form className={classes.container} noValidate>
            <TextField required 
             id="standard-required" 
             label="Required" 
             defaultValue="Hello World" 
             onChange={handleGoalTitleChange}
             value={goalName}/>
            <TextField
            id="date"
            label="Due Date"
            type="date"
            defaultValue="3000-9-21"
            value={dueDate}
            onChange={handleDateChange}
            className={classes.textField}
            InputLabelProps={{
               shrink: true,
            }}
            />
         </form>
         <List>
            {subGoalCmps}
            <ListItem key={subGoalCmps.length}>
               <IconButton 
                edge="end" 
                aria-label="add">
                  <Button 
                   color="primary"
                   variant="contained"
                   onClick={addSubGoal}>
                     Add Subgoal
                  </Button>
               </IconButton>
            </ListItem>
         </List>
         <Button 
          color="primary"
          variant="contained" 
          type="submit"
          onClick={submit}
          disabled={!goalValid()}>
            Submit
         </Button>
      </View>
   )
}

export default CreateGoalPage;