import {useQuery, gql} from '@apollo/client';


export const LIST_COURSES = gql
`
query GetCourseInfos {
	courseInfos(instructor: "Mr. Butcher") {
	courseId
	course
	description
	instructor
	}
}
`;

export const GET_USER = gql
	`
		query{
			getUser{
			email
			}
		}
	`;

export const ADD_COURSE = gql
	`
		mutation ($course: String!, $instructor: String!, $description: String!) {
			addCourse(
				course:{
					course: $course
					instructor: $instructor
					description: $description
				}
			)
		}
	`;

export const ADD_MISSION = gql
	`
		mutation ($course: String!, $name: String!, $description: String!) {
			addMission(
				mission:{
					course: $course
					name: $name
					description: $description
				}
			)
		}
	`;

export const COURSE_CONTENT = gql 
	`
	query gatherCourseContent($className: String!){
	  courseContent(course: $className) {
		courseInfo {
		  instructor description course
		}
		missions {
		  name
		  id
		}
		targets {
		  targetName
		}
	  }
	}
	`;