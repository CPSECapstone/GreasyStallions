import React , { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import GoalSubListStudent from './GoalSubListStudent';
import OverallGoalProgressBar from './GoalProgressBar'
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql, useApolloClient, useMutation } from '@apollo/client';
import {} from '@apollo/client/react/hooks'
// import  './GoalListStudent.css'
import { LIST_ALL_GOALS, UPDATE_GOAL} from './GoalQueries'
import GoalWithSubGoals from './GoalWithSubGoals'
import { Typography } from '@material-ui/core';

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




let GoalListStudent = ({ navigation, teacher,
 completeSubGoalTeacher,  completeGoalCheckTeacher, studentIdx}) => {
   const [goalProgress, setGoalProgress] = useState(0);
   const client = useApolloClient();
   const classes = useStyles();

   const {data, error, loading} = useQuery(LIST_ALL_GOALS);
   const [updateGoal] = useMutation(UPDATE_GOAL, {refetchQueries: [{query: LIST_ALL_GOALS}]});
   let goals = []


   let goalComponents = [];

   if(loading)
      return (<Typography>
         Loading
      </Typography>);
   
   if(error)
      return(
         <View>
            <Typography>
               Error Occured
            </Typography>
         </View>
      )

   if(data){
      goals = [...data.getAllGoals]
   }

   let completeGoalCheck = (ev, idx) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let goalIdx = ev && ev.target.id;
      if (!goalIdx) {
         goalIdx = idx
      }
      let prevGoalCompleteVal = getAllGoals[goalIdx].completed
      let newGoal = {
         ...getAllGoals[goalIdx],
         completed: !prevGoalCompleteVal
      };
      delete newGoal.__typename
      updateGoal({variables:{ goal: newGoal}});
   }

   let completeSubGoal = (ev) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let newGoals = [...getAllGoals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let subGoals = newGoals[goalIdx].subGoals
      let prevGoalCompleteVal = getAllGoals[goalIdx].completed
      let prevSubCompleteVal = subGoals[subGoalIdx].completed
      let newGoal = {
         id: newGoals[goalIdx].id,
         title: newGoals[goalIdx].title,
         dueDate: newGoals[goalIdx].dueDate,
         category: newGoals[goalIdx].category,
         favorited: newGoals[goalIdx].favorited,
         owner: newGoals[goalIdx].owner,
         assignee: newGoals[goalIdx].assignee,
         pointValue: newGoals[goalIdx].pointValue,
         subGoals: [],
      };
      let newSubGoalVals = getAllGoals[goalIdx].subGoals[subGoalIdx];
      newGoal.subGoals[subGoalIdx] = {
         title: newSubGoalVals.title,
         dueDate: newSubGoalVals.dueDate,
         completedDate: newSubGoalVals.completedDate,
         completed: !prevSubCompleteVal
      }
      delete newGoal.subGoals[subGoalIdx].__typename
      newGoals[goalIdx].subGoals.forEach( (subGoal, idx) => {
         if(idx != subGoalIdx) {
            newGoal.subGoals[idx] = {
               ...subGoal
            }
            delete newGoal.subGoals[idx].__typename
         }
      })
      newGoal.completed = (subCompleted === subGoals.length ||
       subCompleted === subGoals.length - 1 && prevSubCompleteVal) ?
       !prevGoalCompleteVal : prevGoalCompleteVal
      delete newGoal.__typename
      newGoals[goalIdx] = newGoal;
      let reducer = (acc, cv) => cv.completed ? acc + 1 : acc;
      let subCompleted = newGoals[goalIdx].subGoals.reduce(reducer, 0)
      updateGoal({variables:{ goal: newGoal}});
   }

   let editGoal = (idx) => {
      let params = {
         idx: idx,
         teacher: teacher
      }
      navigation.navigate('CreateGoalPage', params)
   }

   let starGoal = (idx) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let newGoals = [...getAllGoals];
      let newGoal = {
         id: newGoals[idx].id,
         title: newGoals[idx].title,
         dueDate: newGoals[idx].dueDate,
         category: newGoals[idx].category,
         favorited: !newGoals[idx].favorited,
         owner: newGoals[idx].owner,
         completed: newGoals[idx].completed,
         assignee: newGoals[idx].assignee,
         pointValue: newGoals[idx].pointValue,
         subGoals: [],
      };
      newGoals[idx].subGoals.forEach( (subGoal, subIdx) => {
         newGoal.subGoals[subIdx] = {
            ...subGoal
         }
         delete newGoal.subGoals[subIdx].__typename
      })
      updateGoal({variables:{ goal: newGoal}});
   }

   
   let makeGoalNoSubs = (goal, editGoal, idx) => {
      return (
      <ListItem key={idx + " goal"} button>
         <ListItemText className={classes.goalWithSubsName}>
            {goal.title}
         </ListItemText>
         <ListItemText className={classes.goalWithSubsDue}>
            {"due by: " + goal.dueDate}
         </ListItemText>
         <ListItemIcon>
            <Checkbox
            edge="start"
            color="primary"
            onChange={teacher 
               ? completeGoalCheckTeacher : completeGoalCheck}
            checked={goal.completed}
            id={idx + (teacher ? " " + studentIdx : "")}
            />
         </ListItemIcon>
         <ListItemIcon>
            <IconButton 
             edge="end" 
             aria-label="edit"
             onClick={() => starGoal(idx)}>
               {goal.favorited ?
                  <StarIcon /> :
                  <StarBorderOutlinedIcon/>}
            </IconButton>
         </ListItemIcon>
         <ListItemSecondaryAction>
               <IconButton 
                edge="end" 
                aria-label="edit"
                onClick={() => editGoal(idx)}>
                  <EditIcon />
               </IconButton>
            </ListItemSecondaryAction>
      </ListItem>)
   }
   if(!teacher){
      goalComponents.push(
         <OverallGoalProgressBar
          goalProgress={goalProgress}
          goalsLength={goals.length}
          showBar={!teacher}/>)
      goalComponents.push(<Divider light />);
   }


   
   goals.forEach((goal,idx) => {
      let subGoalCmps = [];
      if(goal.subGoals)
         goal.subGoals.forEach((subGoal, subIdx) => {
            let subGoalCmp = (<GoalSubListStudent
             subGoal={subGoal}
             completeSubGoal={completeSubGoal}
             completeSubGoalTeacher={completeSubGoalTeacher}
             idx={idx}
             subIdx={subIdx}
             teacher={teacher}
             studentIdx={studentIdx}/>);
            subGoalCmps.push(subGoalCmp);
            subGoalCmps.push(<Divider light />);
      });
      
      let component = goal.subGoals.length ? 
         <GoalWithSubGoals 
          goal={goal}
          editGoal={editGoal}
          idx={idx}
          subGoalCmps={subGoalCmps}
          favGoal={starGoal}/> :
         makeGoalNoSubs(goal, editGoal, idx);
      
      goalComponents.push(component)
      goalComponents.push(<Divider light />);
   });


   return (
      <div>
         {teacher ? null : <h2>Goals:</h2>}
         <List className={classes.goalListRoot}>
            {goalComponents}
         </List>
      </div>
   );
}




export default GoalListStudent;