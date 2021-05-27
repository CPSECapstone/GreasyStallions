import React , { useState } from 'react';
import { ProgressBar, Colors, IconButton } from 'react-native-paper';
import { List } from 'react-native-paper';
import { View } from 'react-native'



let GoalWithSubGoals = ({goal, editGoal, idx, subGoalCmps, favGoal}) => {
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
            return (<View style={{"flex-direction": "row", flexWrap: "wrap"}}>
               <ProgressBar /* progress={progress} color={Colors.blue500} *//>
               <IconButton
                  color={Colors.blue500} 
                  onPress={() => favGoal(idx)}
                  icon={goal.favorited ? "star" : "star-outline"}/>
               <IconButton 
                  color={Colors.blue500} 
                  icon={"pencil"}
                  onPress={() => console.log("Pres")/* editGoal(idx) */}/>
            </View>)}}>
            {subGoalCmps}
         </List.Accordion>
      )
   return subGoalCmp
}

export default GoalWithSubGoals