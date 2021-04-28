import {ListGroup, Button, 
   Col, Row, Card, Accordion, 
   ProgressBar, Form} from 'react-bootstrap'
import React , { useState } from 'react';
import OverallGoalProgressBar from './GoalProgressBar'


let GoalListStudent = ({ goals, setGoals, 
 navigation, goalProgress, setGoalProgress, teacher,
 completeSubGoalTeacher,  completeGoalCheckTeacher, studentIdx}) => {


   let goalComponents = [];

   let completeGoalCheck = (ev, idx) => {
      let newGoals = [...goals];
      let goalIdx = ev && ev.target.id;
      if (!goalIdx) {
         goalIdx = idx
      }
      let prevGoalCompleteVal = newGoals[goalIdx].complete
      newGoals[goalIdx].complete = !prevGoalCompleteVal
      setGoalProgress(prevGoalCompleteVal ? 
       goalProgress - 1 : goalProgress + 1)
      
      setGoals(newGoals)
   }

   let completeSubGoal = (ev) => {
      let newGoals = [...goals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      let subGoals = newGoals[goalIdx].subGoals
      let prevSubCompleteVal = 
         subGoals[subGoalIdx].complete
      newGoals[goalIdx].subGoals[subGoalIdx].complete = 
       !prevSubCompleteVal
      newGoals[goalIdx].subCompleted = 
       subGoals[subGoalIdx].complete ? 
       newGoals[goalIdx].subCompleted + 1:
       newGoals[goalIdx].subCompleted - 1;

      if(newGoals[goalIdx].subCompleted === subGoals.length ||
       newGoals[goalIdx].subCompleted === subGoals.length - 1 
       && prevSubCompleteVal)
       completeGoalCheck(null, goalIdx)
      else
         setGoals(newGoals)
   }

   let editGoal = (idx) => {
      let props = {
         name: goals[idx].name,
         due: goals[idx].due,
         subGoalsIn: goals[idx].subGoals,
         idx: idx,
         setGoals: setGoals,
         goals: goals,
         teacher: teacher
      }
      navigation.navigate('CreateGoalPage', props)
   }

   let makeGoalWithSubs = (goal, editGoal, idx, subGoalCmps) => {
      let progress = goal.subCompleted / goal.subGoals.length * 100;
      return <ListGroup.Item key={idx + " goal"}>
         <Accordion defaultActiveKey="0">
            <Card>
               <Card.Header>
                  <Row>
                     <Col sm={2}>
                        <Accordion.Toggle
                           as={Button}
                           variant="link"
                           eventKey="0">
                           expand
                        </Accordion.Toggle>
                     </Col>
                     <Col sm={3}>
                        {goal.name}
                     </Col>
                     <Col sm={4}>
                        <ProgressBar 
                         now={progress} 
                         label={`${Number((progress).toFixed(2))}%`} />
                     </Col>
                     <Col sm={2}>
                        <Button
                         onClick={() => editGoal(idx)}>
                           Edit
                        </Button>
                     </Col>
                  </Row>
                  <Row>
                     <Col sm={2}></Col>
                     <Col sm={3}>
                        {"due by: " + goal.due}
                     </Col>
                     <Col sm={7}></Col>
                  </Row>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
                  <Card.Body>
                     <ListGroup>
                        {subGoalCmps}
                     </ListGroup>
                  </Card.Body>
               </Accordion.Collapse>
            </Card>
         </Accordion>
      </ListGroup.Item>;
   }
   
   let makeGoalNoSubs = (goal, editGoal, idx) => {
      return (
      <ListGroup.Item key={idx + " goal"}>
         <Row>
            <Col sm={2}>
            </Col>
            <Col sm={3}>
               {goal.name}
            </Col>
            <Col sm={4}>
               <Form.Group 
                controlId={idx + (teacher ? " " + studentIdx : "")}>
                  <Form.Check 
                   type="checkbox" 
                   label="Complete" 
                   onChange={completeGoalCheckTeacher 
                    ? completeGoalCheckTeacher : completeGoalCheck}
                   defaultChecked={goal.complete}
                   />
               </Form.Group>
            </Col>
            <Col sm={2}>
               <Button
                  onClick={() => editGoal(idx)}>
                  Edit
               </Button>
            </Col>
         </Row>
         <Row>
            <Col sm={2}></Col>
            <Col sm={3}>
               {"due by: " + goal.due}
            </Col>
            <Col sm={7}></Col>
         </Row>
      </ListGroup.Item>)
   }


   
   goals.forEach((goal,idx) => {
      let subGoalCmps = [];
      if(goal.subGoals)
         goal.subGoals.forEach((subGoal, subIdx) => {
            let subGoalCmp = 
               <ListGroup.Item key={idx + " " + subIdx + " subGoal"}>
                  <Row>
                     <Col sm={2}></Col>
                     <Col sm={8}>
                        {subGoal.title}
                     </Col>
                     <Col sm={2}>
                        <Form>
                           <Form.Group 
                            controlId={idx + " " + subIdx + 
                            (teacher ? " " + studentIdx : "")}>
                              <Form.Check 
                               type="checkbox" 
                               label="Complete" 
                               onChange={completeSubGoalTeacher ?
                                completeSubGoalTeacher : completeSubGoal}
                               defaultChecked={subGoal.complete}
                              />
                           </Form.Group>
                        </Form>
                     </Col>
                  </Row>
               </ListGroup.Item>
            subGoalCmps.push(subGoalCmp);
      });
      
      let component = goal.subGoals ? 
         makeGoalWithSubs(goal, editGoal, idx, subGoalCmps) :
         makeGoalNoSubs(goal, editGoal, idx);
      goalComponents.push(component)
   });


   return (
      <div>
         {teacher ? null : <h2>Goals:</h2>}
         <ListGroup>
            {teacher ? null : 
            <ListGroup.Item key={-1}>
               <OverallGoalProgressBar
                goalProgress={goalProgress}
                goalsLength={goals.length}
                showBar={!teacher}/>
             </ListGroup.Item>}
            {goalComponents}
         </ListGroup>
      </div>
   );
}




export default GoalListStudent;