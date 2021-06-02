import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';

import { useApolloClient, useMutation } from '@apollo/client'; 
import { LIST_ALL_GOALS, UPDATE_GOAL} from './GoalQueries'
import { TextInput, Title, Button, IconButton, List, Colors, Divider } from 'react-native-paper';
import DatePickerTest from './DatePickerTest'


let CreateGoalPage = ({route, navigation}) => {
   const client = useApolloClient();
   const { idx = undefined , teacher = "student" } = route.params
   const {getAllGoals} = client.readQuery({query: LIST_ALL_GOALS});
   const [updateGoal] = useMutation(UPDATE_GOAL, {refetchQueries: [{query: LIST_ALL_GOALS}]});
   const currGoal = route.params.idx ? getAllGoals[idx] : undefined 
	
   const [goalName, setGoalName] = useState(currGoal ? currGoal.title : "")
   const [dueDate, setDueDate] = useState(currGoal ? new Date(currGoal.dueDate) : undefined)
   const [subGoals, setSubGoals] = useState(currGoal ? currGoal.subGoals : [])
   const [category, setCategory] = useState(currGoal ? currGoal.category : "")

   let subGoalCmps = []

   let addSubGoal = () => {
      setSubGoals(subGoals.concat([{
         title: "",
         dueDate: new Date(),
         completed: false
      }]))
   }

   const handleChange = (idx, text) => {
      let newSubGoals = [...subGoals];
      newSubGoals[idx].title = text;
      setSubGoals(newSubGoals);
   }


   const handleDateChange = (ev) => {
      setDueDate(ev.target.value);
   };

   const handleSubGoalDateChange = (idx, date) => {
      let newSubGoals = [...subGoals];
      newSubGoals[idx].dueDate = date
      setSubGoals(newSubGoals);
   };

   let userType = teacher ? "teacher" : "student";
	let buildDate =(date) => {
		let month = date.getMonth()
		let day = date.getDate()
		console.log(month.toString().length)
		console.log(day.toString().length)
		console.log(date.getFullYear() + "-" + 
		(month.toString().length === 1 ? "0" + month : month) + "-" + 
		(day.toString().length === 1 ? "0" + day : day))
		return date.getFullYear() + "-" + 
		(month.toString().length === 1 ? "0" + month : month) + "-" + 
		(day.toString().length === 1 ? "0" + day : day)
	}

   let submit = () => {
      let finalGoal = {
         title: goalName,
         dueDate: buildDate(dueDate),
         category: category,
         favorited: currGoal ?  currGoal.favorited : false,
         owner: currGoal ? currGoal.owner : "",
         completed: currGoal ? currGoal.completed : false,
         assignee: currGoal ? currGoal.assignee : "",
         pointValue: currGoal ? currGoal.pointValue : 0,
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
      navigation.navigate('GoalPage', {user: "student"});
   }

   let goalValid = () => {
		console.log("goalValid")
		console.log(goalName)
		console.log(category)
		
      return goalName.length /* && dueDate.length */ && category.length;
   };

   let deleteSubGoal = (idx) => {
      let subGoalsTemp = [...subGoals];
      subGoalsTemp.splice(idx, 1)
      setSubGoals(subGoalsTemp)
   }



   subGoals.forEach((goal, idx) => {
      let subGoalCmp = (
         <List.Item
          left={() => 
            {return (
					<View>
						<TextInput
							mode="outlined"
							label="Goal Name"
							value={goal.title ? goal.title : ""}
							onChangeText={text => handleChange(idx, text)}/>
						<DatePickerTest
							date={goal.dueDate}
							setDate={(date) => handleSubGoalDateChange(idx, date)}/>
					</View>)}}
          right={() => {
            return <IconButton 
             icon={"delete"}
             onPress={() => deleteSubGoal(idx)}/>
          }}/>
      )
      subGoalCmps.push(subGoalCmp)
      subGoalCmps.push(<Divider light />);
   });
   return(
      <View>
         <Title>{isNaN(idx)? "Make Goal" : "Edit Goal"}</Title>
         <TextInput
            mode="outlined"
            label="Goal Name"
            value={goalName}
            onChangeText={text => setGoalName(text)}/>
         <TextInput
            mode="outlined"
            label="Category"
            value={category}
            onChangeText={text => setCategory(text)}/>
         <DatePickerTest
			 date={dueDate}
			 setDate={setDueDate}/>
         {subGoalCmps}
         <Button
			 style={{margin: "1%"}}
          onPress={addSubGoal}
          color={Colors.blue500}
          mode="contained">
             <Text>{"Add SubGoal"}</Text>
          </Button>
         <Button
			 style={{margin: "1%"}}
          onPress={addSubGoal}
          disabled={!goalValid()}
          onPress={submit}
          color={Colors.green200}
          mode="contained">
            <Text>{"Submit"}</Text>
         </Button>
      </View>
   );

}

export default CreateGoalPage;