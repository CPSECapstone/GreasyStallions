import { gql} from '@apollo/client';

export const MISSION_TASKS = gql`
   query getMissionTasks ($missionID: String){
   mission(missionId: $missionID) {
      name
         description
         missionContent {
               ... on Task {
                  name
                  id
               }
               ... on SubMission {
                  name
               }
         }
   }
   }
   `;
export const TASK_PROGRESS = gql`
   query getTaskProgress ($taskId: String){
      retrieveTaskProgress(taskId: $taskId){
      taskId
      username
      finishedRequirementIds
      }
   }
`;