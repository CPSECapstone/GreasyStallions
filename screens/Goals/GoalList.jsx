import {ListGroup, Button, 
   Col, Row, Card, Accordion, 
   ProgressBar, Form} from 'react-bootstrap'
import React, { useState, useEffect } from 'react';


let GoalList = ({goals, setGoals, completeGoal }) => {

   let goalComponents = [];

   let completeGoal = (ev) => {
      
   }
   
   goals.forEach(goal => {
      let subGoalCmps = [];
      goal.subGoals.forEach((subGoal) => {
         let subGoalCmp = 
            <ListGroup.Item>
               <Row>
                  <Col sm={2}></Col>
                  <Col sm={8}>
                     {subGoal.title}
                  </Col>
                  <Col sm={2}>
                     <Form>
                        <Form.Group controlId="completeSubTask">
                           <Form.Check 
                            type="checkbox" 
                            label="Complete" 
                            onChange={completeGoal}
                            />
                        </Form.Group>
                     </Form>
                  </Col>
               </Row>
            </ListGroup.Item>
         subGoalCmps.push(subGoalCmp);
      });
      let progress = goal.subComplete / goal.num * 100;
      console.log(progress)
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
                           edit
                        </Col>
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
         {console.log(goals)}
         <ListGroup>
            {goalComponents}
         </ListGroup>
      </div>
   );
}

export default GoalList;