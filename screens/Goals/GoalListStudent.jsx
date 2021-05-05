import React , { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ProgressBar, Colors } from 'react-native-paper';
import GoalSubListStudent from './GoalSubListStudent';
import OverallGoalProgressBar from './GoalProgressBar'
import { makeStyles } from '@material-ui/core/styles';
import  './GoalListStudent.css'

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


let GoalListStudent = ({ goals, setGoals, 
 navigation, goalProgress, setGoalProgress, teacher,
 completeSubGoalTeacher,  completeGoalCheckTeacher, studentIdx}) => {
   const [goalOpenList, setGoalOpenList] = useState(new Array(goals.length).fill(false));
   const classes = useStyles();

   let goalComponents = [];

   let completeGoalCheck = (ev, idx) => {
      let newGoals = [...goals];
      let goalIdx = ev && ev.target.id;
      if (!goalIdx) {
         goalIdx = idx
      }
      let prevGoalCompleteVal = newGoals[goalIdx].complete
      newGoals[goalIdx].complete = !prevGoalCompleteVal
      setGoalProgress(prevGoalCompleteVal ? 
       goalProgress - 1 : goalProgress + 1)
      
      setGoals(newGoals)
   }

   let completeSubGoal = (ev) => {
      let newGoals = [...goals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let subGoals = newGoals[goalIdx].subGoals
      let prevSubCompleteVal = 
         subGoals[subGoalIdx].complete
      newGoals[goalIdx].subGoals[subGoalIdx].complete = 
       !prevSubCompleteVal
      newGoals[goalIdx].subCompleted = 
       subGoals[subGoalIdx].complete ? 
       newGoals[goalIdx].subCompleted + 1:
       newGoals[goalIdx].subCompleted - 1;

      if(newGoals[goalIdx].subCompleted === subGoals.length ||
       newGoals[goalIdx].subCompleted === subGoals.length - 1 
       && prevSubCompleteVal)
       completeGoalCheck(null, goalIdx)
      else
         setGoals(newGoals)
   }

   let editGoal = (idx) => {
      let props = {
         name: goals[idx].name,
         due: goals[idx].due,
         subGoalsIn: goals[idx].subGoals,
         idx: idx,
         setGoals: setGoals,
         goals: goals,
         teacher: teacher
      }
      navigation.navigate('CreateGoalPage', props)
   }

   let makeGoalWithSubs = (goal, editGoal, idx, subGoalCmps) => {
      let progress = goal.subCompleted / goal.subGoals.length;
      let subGoalCmp = [];
      let toggleGoalOpenList = () => {
         let tempGoalOpenList = [...goalOpenList];
         tempGoalOpenList[idx] = !tempGoalOpenList[idx];
         setGoalOpenList(tempGoalOpenList);
      }

      subGoalCmp.push(
         <ListItem key={idx + " goal"} button onClick={toggleGoalOpenList}>
            <ListItemText 
             primary={goal.name}
             className={classes.goalWithSubsName}/>
            <ListItemText 
             primary={"due by: " + goal.due}
             className={classes.goalWithSubsDue}/>
            <ListItemIcon className={classes.goalWithSubsProgressBar}>
               <Icon className={classes.goalWithSubsProgressBarIcon}>
                  <ProgressBar progress={progress} color={Colors.red800} />
               </Icon>
            </ListItemIcon>
            {!goalOpenList[idx] ? <ExpandLess /> : <ExpandMore />}
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
         <Collapse in={goalOpenList[idx]} timeout="auto" unmountOnExit>
            <List>
               {subGoalCmps}
            </List>
         </Collapse>)
      return subGoalCmp;
   }
   
   let makeGoalNoSubs = (goal, editGoal, idx) => {
      return (
      <ListItem key={idx + " goal"} button>
         <ListItemText className={classes.goalWithSubsName}>
            {goal.name}
         </ListItemText>
         <ListItemText className={classes.goalWithSubsDue}>
            {"due by: " + goal.due}
         </ListItemText>
         <ListItemIcon>
            <Checkbox
            edge="start"
            color="primary"
            onChange={completeGoalCheckTeacher 
               ? completeGoalCheckTeacher : completeGoalCheck}
            checked={goal.complete}
            id={idx + (teacher ? " " + studentIdx : "")}
            />
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
       <ListItem key={-1}>
         <OverallGoalProgressBar
          goalProgress={goalProgress}
          goalsLength={goals.length}
          showBar={!teacher}/>
        </ListItem>)
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
      
      let component = goal.subGoals ? 
         makeGoalWithSubs(goal, editGoal, idx, subGoalCmps) :
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