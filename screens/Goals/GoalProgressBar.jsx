import React from 'react';
import { LIST_ALL_GOALS } from './GoalQueries'
import { useApolloClient } from '@apollo/client';
import { List, Colors, ProgressBar } from 'react-native-paper';


// Goal Progress Bar for GoalListStudent that hides on teacher view
let OverallGoalProgressBar = ({goalProgress, goalsLength, showBar}) => {
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

   return (<List.Item
             title={"Overall Goal Progress: " + 
             (Number((parseFloat(goalProgressVal)).toFixed(2)) * 100) 
              + "%"}
            right={() => <ProgressBar 
               progress={goalProgressVal}
               color={Colors.red800}/>}/>)
}

export default OverallGoalProgressBar