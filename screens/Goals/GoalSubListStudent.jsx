import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';



let GoalSubListStudent = ({subGoal, completeSubGoal,
 completeSubGoalTeacher, idx, subIdx, teacher, studentIdx}) => {
   return (
      <List.Item
       title={subGoal.title}
       description={"due by: "+ subGoal.dueDate}
       right={() =>
         <IconButton
          icon={subGoal.completed ? 
           "checkbox-marked" : "checkbox-blank-outline"}
          color={Colors.blue500} 
          onPress={teacher 
           ? completeSubGoalTeacher : () => completeSubGoal(idx + " " + subIdx)} />}/>
   )

};

export default GoalSubListStudent;