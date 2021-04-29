import GoalListStudent from './GoalListStudent';
import React from 'react';
import { ListGroup, Card, Accordion, Row, Col, Button } from 'react-bootstrap'


let GoalListTeacher = ({navigation, studentGoals, 
   setStudentGoals}) => {
   let studentGoalComponents = [];

   let completeGoalCheckTeacher = (ev, idx) => {
      let newGoals = [...studentGoals]; // copies into new array
      let goalIdx = ev && ev.target.id.split(" ")[0];
      let studentIdx = ev.target.id.split(" ")[1];
      if (!goalIdx) {
         goalIdx = idx
      }
      let prevGoalCompleteVal = newGoals[studentIdx].goals[goalIdx].complete
      newGoals[studentIdx].goals[goalIdx].complete = !prevGoalCompleteVal
      setStudentGoals(newGoals)
   };

   let completeSubGoalTeacher = (ev) => {
      let newGoals = [...studentGoals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let studentIdx = ev.target.id.split(" ")[2]
      let subGoals = newGoals[studentIdx].goals[goalIdx].subGoals
      let goalSubCompleted = newGoals[studentIdx].goals[goalIdx].subCompleted;
      let prevSubCompleteVal = 
         subGoals[subGoalIdx].complete

      newGoals[studentIdx].goals[goalIdx].subGoals[subGoalIdx].complete = 
       !prevSubCompleteVal
      newGoals[studentIdx].goals[goalIdx].subCompleted = 
       subGoals[subGoalIdx].complete ? 
       goalSubCompleted + 1:
       goalSubCompleted - 1;

      setStudentGoals(newGoals)
   };

   let teacherSetGoals = (idx, newStudentGoal) => {
      let newGoals = [...studentGoals];
      newGoals[idx].goals = newStudentGoal;
      setStudentGoals(newGoals);
   }

   studentGoals.forEach((studentGoal, idx) => {
      let studentGoalComponent = (
         <ListGroup.Item key={idx + " StudentGoals"}>
            <Accordion defaultActiveKey="0">
            <Card>
               <Card.Header>
                  <Row>
                     <Col sm={2}>
                        <Accordion.Toggle
                           as={Button}
                           variant="link"
                           eventKey={"0"}>
                           expand
                        </Accordion.Toggle>
                     </Col>
                     <Col sm={3}>
                        {studentGoal.student_name}
                     </Col>
                  </Row>
               </Card.Header>
               <Accordion.Collapse eventKey={"0"}>
                  <GoalListStudent
                   goals={studentGoal.goals}
                   studentIdx={idx}
                   navigation={navigation}
                   teacher={true}
                   setGoals={(goal) => teacherSetGoals(idx, goal)}
                   completeSubGoalTeacher={completeSubGoalTeacher}
                   completeGoalCheckTeacher={completeGoalCheckTeacher}/>
               </Accordion.Collapse>
            </Card>
         </Accordion>
       </ListGroup.Item>
      )
      studentGoalComponents.push(studentGoalComponent)
   });

   return (
      <ListGroup>
         {studentGoalComponents}
      </ListGroup>
   );
};
export default GoalListTeacher;