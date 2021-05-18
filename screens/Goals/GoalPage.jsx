import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import GoalListStudent from './GoalListStudent'
import GoalListTeacher from './GoalListTeacher'
import { useQuery, gql, goalList} from '@apollo/client';
import { Typography } from '@material-ui/core';
// import { goalList} from '../../apollo';


let LIST_ALL_GOALS = gql
`
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

let GoalPage = ({route, navigation}) => {
   const {user} = route.params;
   // const sampleStudentGoals = [
   //    {
   //      student_name: "Jimmy",
   //      goals: [{
   //        id: 0,
   //        name: "Read 10 Books", 
   //        subCompleted: 1, 
   //        due: "2021-04-06", 
   //        subGoals: [
   //        {
   //            title: "book1",
   //            complete: true
   //        },
   //        {
   //            title: "book2",
   //            complete: false
   //        },
   //        {
   //            title: "book3",
   //            complete: false
   //        },
   //        {
   //            title: "book4",
   //            complete: false
   //        },]
   //      },
   //      {
   //        id: 1,
   //        name: "Make a friend",
   //        complete: false,
   //        due: "2021-04-06",
   //      }]
   //    },
   //    {
   //      student_name: "Susan",
   //      goals: [{
   //        id: 0,
   //        name: "Read 10 Books", 
   //        subCompleted: 1, 
   //        due: "2021-04-06", 
   //        subGoals: [
   //        {
   //            title: "book1",
   //            complete: true
   //        },
   //        {
   //            title: "book2",
   //            complete: false
   //        },
   //        {
   //            title: "book3",
   //            complete: false
   //        },
   //        {
   //            title: "book4",
   //            complete: false
   //        },]
   //      },
   //      {
   //        id: 1,
   //        name: "Make a friend",
   //        complete: false,
   //        due: "2021-04-06",
   //      }]
   //    }
   // ];
   // const sampleGoal = [
   //    {
   //       id: 0,
   //       name: "Read 10 Books", 
   //       subCompleted: 1, 
   //       due: "2021-04-06", 
   //       subGoals: [
   //       {
   //          title: "book1",
   //          complete: true
   //       },
   //       {
   //          title: "book2",
   //          complete: false
   //       },
   //       {
   //          title: "book3",
   //          complete: false
   //       },
   //       {
   //          title: "book4",
   //          complete: false
   //       },]
   //    },
   //    {
   //       id: 1,
   //       name: "Make a friend",
   //       complete: false,
   //       due: "2021-04-06",
   //    }]
   // const {data, error, loading} = useQuery(LIST_ALL_GOALS);
   const teacher =  user === 'teacher' 
   const [studentGoals, setStudentGoals] = useState(undefined);
   const [goals, setGoals] = useState(undefined);
   const [goalProgress, setGoalProgress] = useState(0);

   // useEffect(() => {
   //    console.log(loading)
   //    console.log(data)
   //    console.log(teacher)
   //    if(!loading && data) {
   //       if(teacher)
   //          setStudentGoals(data.getAllGoals)
   //       else{
   //          setGoals(data.getAllGoals)
   //       }
   //    }
   // }, [loading, data, teacher])

   // if(!loading && data) {
   //    if(teacher)
   //       setStudentGoals(data.getAllGoals)
   //    else{
   //       setGoals(data.getAllGoals)
   //    }
   // }

   // if(loading)
   //    return(<View>
   //       <ActivityIndicator size="large"/>
   //       <Typography>
   //          Loading....
   //       </Typography>
   //    </View>)

   // if(error)
   //    return(
   //       <View>
   //          <Typography>
   //             Error Occured
   //          </Typography>
   //       </View>
   //    )

   return (
      <View>
         {console.log(goalList)}
         {user === 'teacher' ?
         <GoalListTeacher
         studentGoals={goalList}
         setStudentGoals={goalList}
         navigation={navigation}/> :
         <GoalListStudent 
         /* goals={goalList}
         setGoals={goalList} */
         teacher={false}
         goalProgress={goalProgress}
         setGoalProgress={setGoalProgress}
         navigation={navigation}/>}
      </View>)

}
export default GoalPage;