import {useQuery, useMutation, gql} from '@apollo/client';

//course to run test on
let COURSE_NAME = 'Integrated Science';

//mutation to add a mission
const ADD_MISSION = gql
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

//query to gather course content which contains missions
const COURSE_CONTENT = gql 
    `
    query {
      courseContent(course: "${COURSE_NAME}") {
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

function dynamoTest(){
    //imports our query and mutation
    const [addMission, {data1, error1}] = useMutation(ADD_MISSION);
    const {data, error, loading} = useQuery(COURSE_CONTENT);
        if (error) { console.log('Error fetching courses', error); }

        addMission({ 
			variables:{ 
				"course": COURSE_NAME, 
				"name": "mission test (delete me)", 
				"description": "desc test (delete me)" 
			}   
		});

    // test functionality
    describe("Mutation successful", () => {
        test("Confirms successful addition of a mission to dynamo", () => {
            const found = false;
            const result = data.courseContent.missions;
            //for each mission in the return query
            //check that our mutated mission exists
            reult.forEach(mission => {
                if (mission.name == "mission test (delete me)"){
                    found = true;
                }
            })
            expect(found).toEqual(true);
        }
    )});

}
    
    

