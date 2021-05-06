import React , { useState } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import GoalListStudent from './GoalListStudent';

const useStyles = makeStyles({
   studentGoalListRoot:{
      'background-color': 'white',
      padding: '30px 0px 0px 0px',
      border: '1px solid grey',
      'border-radius': '5px'
   }
 });

let GoalListTeacher = ({navigation, studentGoals, 
 setStudentGoals}) => {
   const [studentOpenList, setStudentOpenList] = 
    useState(new Array(studentGoals.length).fill(false));
   const classes = useStyles();
   let studentGoalComponents = [];

   let completeGoalCheckTeacher = (ev, idx) => {
      let newGoals = [...studentGoals]; // copies into new array
      console.log(ev.target.id)
      let goalIdx = ev && ev.target.id.split(" ")[0];
      let studentIdx = ev.target.id.split(" ")[1];
      if (!goalIdx) {
         goalIdx = idx
      }
      let prevGoalCompleteVal = newGoals[studentIdx].goals[goalIdx].complete
      newGoals[studentIdx].goals[goalIdx].complete = !prevGoalCompleteVal
      setStudentGoals(newGoals)
   };

   let completeSubGoalTeacher = (ev) => {
      let newGoals = [...studentGoals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let studentIdx = ev.target.id.split(" ")[2]
      let subGoals = newGoals[studentIdx].goals[goalIdx].subGoals
      let goalSubCompleted = newGoals[studentIdx].goals[goalIdx].subCompleted;
      let prevSubCompleteVal = 
         subGoals[subGoalIdx].complete

      newGoals[studentIdx].goals[goalIdx].subGoals[subGoalIdx].complete = 
       !prevSubCompleteVal
      newGoals[studentIdx].goals[goalIdx].subCompleted = 
       subGoals[subGoalIdx].complete ? 
       goalSubCompleted + 1:
       goalSubCompleted - 1;

      setStudentGoals(newGoals)
   };

   let teacherSetGoals = (idx, newStudentGoal) => {
      let newGoals = [...studentGoals];
      newGoals[idx].goals = newStudentGoal;
      setStudentGoals(newGoals);
   }

   studentGoals.forEach((studentGoal, idx) => {
      let toggleStudentOpenList = () => {
         let tempStudentOpenList = [...studentOpenList];
         tempStudentOpenList[idx] = !tempStudentOpenList[idx];
         setStudentOpenList(tempStudentOpenList);
      }

      let studentGoalHeader = (
         <ListItem key={idx + " StudentGoals"}
          id={idx}
          button onClick={toggleStudentOpenList}>
            <ListItemText primary={studentGoal.student_name}/>
            {!studentOpenList[idx] ? <ExpandLess /> : <ExpandMore />}
       </ListItem>
      );
      studentGoalComponents.push(studentGoalHeader);
      let studentGoalComponent = (
         <Collapse in={studentOpenList[idx]} timeout="auto" unmountOnExit>
            <GoalListStudent
             goals={studentGoal.goals}
             studentIdx={idx}
             navigation={navigation}
             teacher={true}
             setGoals={(goal) => teacherSetGoals(idx, goal)}
             completeSubGoalTeacher={completeSubGoalTeacher}
             completeGoalCheckTeacher={completeGoalCheckTeacher}/>      
         </Collapse>
      );
      studentGoalComponents.push(studentGoalComponent);
      studentGoalComponents.push(<Divider light />);
   });

   return (
      <List className={classes.studentGoalListRoot}>
         {studentGoalComponents}
      </List>
   );
};
export default GoalListTeacher;