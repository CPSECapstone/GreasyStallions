import React , { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View,  StyleSheet } from 'react-native';
import GoalSubListStudent from './GoalSubListStudent';
import OverallGoalProgressBar from './GoalProgressBar'
import { useQuery, gql, useApolloClient, useMutation } from '@apollo/client';
import {} from '@apollo/client/react/hooks'
import { LIST_ALL_GOALS, UPDATE_GOAL} from './GoalQueries'
import GoalWithSubGoals from './GoalWithSubGoals'
import { List, Colors, IconButton, Divider, Text, Title, Button} from 'react-native-paper';




let GoalListStudent = ({ navigation, teacher,
 completeSubGoalTeacher,  completeGoalCheckTeacher, studentIdx}) => {
   const [goalProgress, setGoalProgress] = useState(0);
   const client = useApolloClient();

   const {data, error, loading} = useQuery(LIST_ALL_GOALS);
   const [updateGoal] = useMutation(UPDATE_GOAL, {refetchQueries: [{query: LIST_ALL_GOALS}]});
   let goals = []


   let goalComponents = [];

   if(loading)
      return (
		<View>
			<Text>
         	{"Loading"}
      	</Text>
		</View>);
   
   if(error)
      return(
         <View>
            <Text>
               {"Error Occured"}
            </Text>
         </View>
      )

   if(data){
      goals = [...data.getAllGoals]
   }

   let completeGoalCheck = (idx) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let goalIdx = idx;
      console.log(idx)
      let prevGoalCompleteVal = getAllGoals[goalIdx].completed
      let newGoal = {
         ...getAllGoals[goalIdx],
         completed: !prevGoalCompleteVal
      };
      delete newGoal.__typename
      updateGoal({variables:{ goal: newGoal}});
   }

   let completeSubGoal = (idx) => {
      const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
      let newGoals = [...getAllGoals];
      let goalIdx = idx.split(" ")[0]
      let subGoalIdx = idx.split(" ")[1]
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
         <List.Item
          title={goal.title}
          description={"Due by: " + goal.dueDate}
          right={() => {
            let lst = [];
            console.log(idx)
            lst.push(
               <IconButton
                onPress={() => starGoal(idx)}
                color={Colors.blue500} 
                icon={goal.favorited ? "star" : "star-outline"}/>)
            lst.push(<IconButton
                icon={goal.completed ? 
                  "checkbox-marked" : "checkbox-blank-outline"}
                color={Colors.blue500} 
                onPress={teacher 
                  ? completeGoalCheckTeacher : () => completeGoalCheck(idx)} />)
            lst.push(<IconButton 
               color={Colors.blue500} 
               icon={"pencil"}
               onPress={() => editGoal(idx)}/>)
            return lst
          }}
          />
      )
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

	console.log(goals)
	console.log(goals)
   return (
      <View>
				<Title>
					{"Goals"}
				</Title>
            {goalComponents}
				<Button  
				 mode="contained" 
				 color={Colors.blue500}
				 onPress={() => navigation.navigate('CreateGoalPage',{idx: undefined})}>
					<Text>
						{"Create New Goal"}
					</Text>
				</Button>
      </View>
   );
}




export default GoalListStudent;