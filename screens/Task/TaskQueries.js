import {gql} from '@apollo/client';

export const SAVE_MCQUESTION = gql`
  mutation saveMCQuestion($taskId: String!, $blockId: String!, $questionId: String!, $answerId: Int!) {
    saveMultipleChoiceProgress(mcBlockInput: {
      taskId: $taskId
      questionBlockId: $blockId
      questionId: $questionId
      answerId: $answerId
    })
  }
`;

export const SAVE_FRQUESTION = gql`
  mutation saveFRQuestion($taskId: String!, $blockId: String!, $questionId: String!, $answer: String!){
    saveFreeResponseProgress(frBlockInput: {
      taskId: $taskId
      questionBlockId: $blockId
      questionId: $questionId
      answer: $answer
    })
  }
`;
export const GET_TASK_BY_ID = gql
`query getTask($id: String!){
    task(taskId: $id) {
      id
      requirements {
        id
        description
      }
      name
      pages {
        skippable
        blocks {
          title
          __typename
          ... on ImageBlock {
            imageUrl
          }
          ... on TextBlock {
            contents
            fontSize
          }
          ... on VideoBlock {
            videoUrl
          }
          ... on QuizBlock {
            requiredScore
            blockId
            questions {
              __typename
              ...on FrQuestion {
                id
                description
                answer
              }
              ...on McQuestion {
                id
                description
                options {
                  id
                  description
                }
                answers
              }
            }
          }
        }
      }
    }
  }
`;