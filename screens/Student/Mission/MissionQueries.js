import { gql } from '@apollo/client';

export const GET_ALL_MISSION_PROGRESS = gql`
  query getMissionsProgress($id: String!) {
    getAllMissionProgress(courseId: $id) {
      mission {
        id
        name
      }
      progress {
        taskId
        name
        submission{
          graded
          pointsAwarded
          pointsPossible
        }
      }
      student
    }
  }
`;