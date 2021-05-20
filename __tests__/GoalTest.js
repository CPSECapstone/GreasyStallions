import React from 'react';
import renderer from 'react-test-renderer';
import buildNewGoal from '../screens/Goals/GoalListStudent';

test('buildNewGoal test', () => {
   const sampleGoalsInput = {
      "__typename" : "Goal",
      "id": "c664cab040f",
      "title": "EAT ICE CREAM!",
      "dueDate": "2022-03-05",
      "completed": true,
      "completedDate": null,
      "category": "Emotional",
      "favorited": true,
      "owner": "Google_102408412417121568291",
      "assignee": "Google_102408412417121568291",
      "pointValue": 0,
      "subGoals": [
         {
            "__typename" : "SubGoal",
            "title": "MINT CHOCOLATE!",
            "dueDate": "2022-03-05",
            "completed": false,
            "completedDate": null
         },
         {
            "__typename" : "SubGoal",
            "title": "VANILLA!",
            "dueDate": "2022-03-05",
            "completed": false,
            "completedDate": null
         },
         {
            "__typename" : "SubGoal",
            "title": "asdf",
            "dueDate": "2021-05-26",
            "completed": false,
            "completedDate": null
         }
      ]
   }
   const expectedGoal = {
      "id": "c664cab040f",
      "title": "EAT ICE CREAM!",
      "dueDate": "2022-03-05",
      "completed": true,
      "completedDate": null,
      "category": "Emotional",
      "favorited": true,
      "owner": "Google_102408412417121568291",
      "assignee": "Google_102408412417121568291",
      "pointValue": 0,
      "subGoals": [
         {
            "title": "MINT CHOCOLATE!",
            "dueDate": "2022-03-05",
            "completed": true,
            "completedDate": null
         },
         {
            "title": "VANILLA!",
            "dueDate": "2022-03-05",
            "completed": false,
            "completedDate": null
         },
         {
            "title": "asdf",
            "dueDate": "2021-05-26",
            "completed": false,
            "completedDate": null
         }
      ]
   }
   const goalIdx = 1
   const getAllGoals = [
      {
         "__typename" : "Goal",
         "id": "75c171e7fa0",
         "title": "Make a Friend",
         "dueDate": "2022-03-05",
         "completed": true,
         "completedDate": null,
         "category": "Emotional",
         "favorited": true,
         "owner": "Google_102408412417121568291",
         "assignee": "Google_102408412417121568291",
         "pointValue": 0,
         "subGoals": []
      },
      {
         "__typename" : "Goal",  
         "id": "c664cab040f",
         "title": "EAT ICE CREAM!",
         "dueDate": "2022-03-05",
         "completed": true,
         "completedDate": null,
         "category": "Emotional",
         "favorited": true,
         "owner": "Google_102408412417121568291",
         "assignee": "Google_102408412417121568291",
         "pointValue": 0,
         "subGoals": [
            {
               "__typename" : "SubGoal",
               "title": "MINT CHOCOLATE!",
               "dueDate": "2022-03-05",
               "completed": false,
               "completedDate": null
            },
            {
               "__typename" : "SubGoal",
               "title": "VANILLA!",
               "dueDate": "2022-03-05",
               "completed": false,
               "completedDate": null
            },
            {
               "__typename" : "SubGoal",
               "title": "asdf",
               "dueDate": "2021-05-26",
               "completed": false,
               "completedDate": null
            }
         ]
      }
   ]
   const subGoalIdx = 0
   const prevSubCompleteVal = false
   const outGoal = buildNewGoal(getAllGoals, goalIdx, getAllGoals, subGoalIdx, prevSubCompleteVal);
   expect(outGoal).toEqual(expectedGoal);
});