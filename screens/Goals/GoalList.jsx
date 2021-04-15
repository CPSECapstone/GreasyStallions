import {ListGroup, Button, 
   Col, Row, Card, Accordion, 
   ProgressBar, Form} from 'react-bootstrap'
import React, { useState, useEffect } from 'react';


let GoalList = ({goals, setGoals, completeGoal, navigation}) => {

   let goalComponents = [];

   let completeSubGoal = (ev) => {
      let newGoals = [...goals];
      let goalIdx = ev.target.id.split(" ")[0]
      let subGoalIdx = ev.target.id.split(" ")[1]
      newGoals[goalIdx].subGoals[subGoalIdx].complete = 
       !newGoals[goalIdx].subGoals[subGoalIdx].complete
      newGoals[goalIdx].subCompleted = 
       newGoals[goalIdx].subGoals[subGoalIdx].complete ? 
       newGoals[goalIdx].subCompleted + 1:
       newGoals[goalIdx].subCompleted - 1;
      setGoals(newGoals)
   }

   let editGoal = (idx) => {
      let props = {
         name: goals[idx].name,
         due: goals[idx].due,
         subGoalsIn: goals[idx].subGoals,
         numToComplete: goals[idx].numToComplete,
         idx: idx,
         setGoals: setGoals,
         goals: goals,
      }
      navigation.navigate('CreateGoalPage', props)

   }


   
   goals.forEach((goal,idx) => {
      let subGoalCmps = [];
      
      goal.subGoals.forEach((subGoal, subIdx) => {
         let subGoalCmp = 
            <ListGroup.Item>
               <Row>
                  <Col sm={2}></Col>
                  <Col sm={8}>
                     {subGoal.title}
                  </Col>
                  <Col sm={2}>
                     <Form>
                        <Form.Group controlId={idx + " " + subIdx}>
                           <Form.Check 
                            type="checkbox" 
                            label="Complete" 
                            onChange={completeSubGoal}
                            defaultChecked={subGoal.complete}
                            />
                        </Form.Group>
                     </Form>
                  </Col>
               </Row>
            </ListGroup.Item>
         subGoalCmps.push(subGoalCmp);
      });
      let progress = goal.subCompleted / goal.numToComplete * 100;
      let component = 
         <ListGroup.Item>
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
                           <ProgressBar now={progress} label={`${progress}%`} />
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
         </ListGroup.Item>
      goalComponents.push(component)
   });

   return (
      
      <div>
         <h2>Goals:</h2>
         <ListGroup>
            {goalComponents}
         </ListGroup>
      </div>
   );
}

export default GoalList;