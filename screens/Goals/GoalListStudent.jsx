import React , { useEffect, useState } from 'react';
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
import { useQuery, gql, useApolloClient} from '@apollo/client';
import {} from '@apollo/client/react/hooks'
import  './GoalListStudent.css'
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

 let LIST_ALL_GOALS = gql`
 query getGoals {
    getAllGoals {
      id
      title
      dueDate
      completed
      completedDate
      category
      favorited
      owner
      assignee
      pointValue
      subGoals {
        title
        dueDate
        completed
        completedDate
      }
    }
  }
 `;

let GoalListStudent = ({ /* goals, */ setGoals, 
 navigation, goalProgress, setGoalProgress, teacher,
 completeSubGoalTeacher,  completeGoalCheckTeacher, studentIdx}) => {
   const [goalOpenList, setGoalOpenList] = useState([]);
   const client = useApolloClient();
   const classes = useStyles();

   // const {data} = client.readQuery({query: LIST_ALL_GOALS})
   const {data, error, loading} = useQuery(LIST_ALL_GOALS);
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
      console.log(goals)
   }


   let completeGoalCheck = (ev, idx) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let newGoals = [...getAllGoals];
      let goalIdx = ev && ev.target.id;
      if (!goalIdx) {
         goalIdx = idx
      }
      newGoals[goalIdx] = {};
      let prevGoalCompleteVal = getAllGoals[goalIdx].completed
      newGoals[goalIdx].completed = !prevGoalCompleteVal
      newGoals[goalIdx].__typename =  getAllGoals[goalIdx].__typename
      newGoals[goalIdx].id =  getAllGoals[goalIdx].id
      setGoalProgress(prevGoalCompleteVal ? 
       goalProgress - 1 : goalProgress + 1)
      let writeStruct = {
         query: LIST_ALL_GOALS,
         data: { getAllGoals: newGoals}
      }
      client.writeQuery(writeStruct)

   }

   let completeSubGoal = (ev) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      console.log(getAllGoals)
      let newGoals = [...getAllGoals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let subGoals = newGoals[goalIdx].subGoals
      let prevSubCompleteVal = subGoals[subGoalIdx].complete
      let freshGoal = {
         __typename: getAllGoals[goalIdx].__typename,
         id: getAllGoals[goalIdx].id,
         subGoals: [...getAllGoals[goalIdx].subGoals],

      };
      freshGoal.subGoals[subGoalIdx] = {
         completed: !prevSubCompleteVal,
         title: getAllGoals[goalIdx].subGoals[subGoalIdx].title,
         dueDate: getAllGoals[goalIdx].subGoals[subGoalIdx].dueDate,
      }
      newGoals[goalIdx] = freshGoal;
      // newGoals[goalIdx] = {};
      // newGoals[goalIdx].__typename =  getAllGoals[goalIdx].__typename
      // newGoals[goalIdx].id =  getAllGoals[goalIdx].id
      // newGoals[goalIdx].subGoals = [...getAllGoals[goalIdx].subGoals]
      // console.log(newGoals)
      // newGoals[goalIdx].subGoals[subGoalIdx] = {__typename: "SubGoal"}
      // newGoals[goalIdx].subGoals[subGoalIdx].completed = 
      //  !prevSubCompleteVal
      // newGoals[goalIdx].subGoals[subGoalIdx].title = 
      //  getAllGoals[goalIdx].subGoals[subGoalIdx].title
      // newGoals[goalIdx].subGoals[subGoalIdx].dueDate = 
      //  getAllGoals[goalIdx].subGoals[subGoalIdx].dueDate
      let reducer = (acc, cv) => cv.completed ? acc + 1 : acc;
      let subCompleted = newGoals[goalIdx].subGoals.reduce(reducer, 0)
      //  subGoals[subGoalIdx].complete ? 
      //  newGoals[goalIdx].subCompleted + 1:
      //  newGoals[goalIdx].subCompleted - 1;
      console.log(subCompleted)

      if(subCompleted === subGoals.length ||
         subCompleted === subGoals.length - 1 && prevSubCompleteVal)
       completeGoalCheck(null, goalIdx)
      else{
         let writeStruct = {
            query: LIST_ALL_GOALS,
            data: { getAllGoals: newGoals}
            
         }
         console.log(writeStruct)
         client.writeQuery(writeStruct)
         console.log(client.readQuery({query: LIST_ALL_GOALS}))
      }
         // setGoals(newGoals)
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
      // let toggleGoalOpenList = () => {
      //    let tempGoalOpenList = [...goalOpenList];
      //    tempGoalOpenList[idx] = !tempGoalOpenList[idx];
      //    setGoalOpenList(tempGoalOpenList);
      // }

      subGoalCmp.push(
         <ListItem key={idx + " goal"} button /* onClick={toggleGoalOpenList} */>
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
            {/* !goalOpenList[idx] ? <ExpandLess /> : */ <ExpandMore />}
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
         <Collapse in={true/* goalOpenList[idx] */} timeout="auto" unmountOnExit>
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