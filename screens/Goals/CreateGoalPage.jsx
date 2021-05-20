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
import { useQuery, gql, useApolloClient, useMutation } from '@apollo/client';
import { LIST_ALL_GOALS, UPDATE_GOAL} from './GoalQueries'


// import './CreateGoalPage.css';

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
   const client = useApolloClient();
   const { idx, teacher } = route.params
   const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
   const [updateGoal] = useMutation(UPDATE_GOAL, {refetchQueries: [{query: LIST_ALL_GOALS}]});
   const currGoal = getAllGoals[idx]
   const [goalName, setGoalName] = useState(currGoal.title ? currGoal.title : "")
   const [dueDate, setDueDate] = useState(currGoal.dueDate ? currGoal.dueDate : new Date('2014-08-18T21:11:54'))
   const [subGoals, setSubGoals] = useState(currGoal.subGoals ? currGoal.subGoals : [])
   const [category, setCategory] = useState(currGoal.category ? currGoal.category : "")
   const classes = useStyles();

   let subGoalCmps = []

   let addSubGoal = () => {
      setSubGoals(subGoals.concat([{
         title:"",
         dueDate: new Date(),
         completed: false
      }]))
   }

   const handleChange = (ev) => {
      let newSubGoals = [...subGoals];
      newSubGoals[ev.target.id].title = ev.target.value;
      setSubGoals(newSubGoals);
   }

   const handleGoalTitleChange = (ev) =>{
      setGoalName(ev.target.value);
   }

   const handleGoalCategoryChange = (ev) =>{
      setCategory(ev.target.value);
   }

   const handleDateChange = (ev) => {
      setDueDate(ev.target.value);
   };

   const handleSubGoalDateChange = (ev) => {
      let newSubGoals = [...subGoals];
      newSubGoals[ev.target.id].dueDate = ev.target.value
      setSubGoals(newSubGoals);
   };

   let userType = teacher ? "teacher" : "student";

   let submit = () => {
      let finalGoal = {
         title: goalName,
         dueDate: dueDate,
         category: category,
         favorited: currGoal.favorited,
         owner: currGoal.owner || "",
         completed: currGoal.completed || false,
         assignee: currGoal.assignee || "",
         pointValue: currGoal.pointValue || 0,
         subGoals: []
      };
      subGoals.forEach( (subGoal, idx) => {
         finalGoal.subGoals[idx] = {
            ...subGoal
         }
         delete finalGoal.subGoals[idx].__typename
      })
      if(idx)
         finalGoal.id = currGoal.id

      updateGoal({variables:{ goal: finalGoal}});
      navigation.navigate('GoalPage', {user: userType});
   }

   let goalValid = () => {
      return goalName.length && dueDate.length && category.length;
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
               <TextField
                  id={idx}
                  label="SubGoal Due Date"
                  type="date"
                  defaultValue="3000-9-21"
                  value={goal.dueDate}
                  onChange={handleSubGoalDateChange}
                  className={classes.textField}
                  InputLabelProps={{
                     shrink: true,
               }}/> 
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
             label="Goal Name" 
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
             }}/>
            <TextField required 
             id="standard-required" 
             label="Goal Category" 
             defaultValue="Category" 
             onChange={handleGoalTitleChange}
             value={category}/>
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