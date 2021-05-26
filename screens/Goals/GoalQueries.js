import { gql } from '@apollo/client'

export const LIST_ALL_GOALS = gql`
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


export const UPDATE_GOAL = gql`
mutation editGoal ($goal: GoalInput!){
   editOrCreateGoal(goal: $goal)
}
`;

