import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListGroup, Form, Button, Col, Row} from 'react-bootstrap'
import './CreateGoalPage.css';
let CreateGoalPage = ({route, navigation}) => {
   const { name, due, subGoalsIn, numToComplete, subComplete, idx, setGoals, goals } = route.params
   const [goalName, setGoalName] = useState(name ? name : "")
   const [dueDate, setDueDate] = useState(due ? due : "")
   const [subGoals, setSubGoals] = useState(subGoalsIn ? subGoalsIn : [])

   let subGoalCmps = []

   let addSubGoal = () => {
      setSubGoals(subGoals.concat([{title:""}]))
   }

   let handleChange = (ev) => {
      let newSubGoals = [...subGoals];
      newSubGoals[ev.target.id].title = ev.target.value;
      setSubGoals(newSubGoals);
   }

   let submit = () => {
      let goalWords = goalName.split(' ');
      let num = goalWords.find(word => !isNaN(parseInt(word)))
      let numIdx = goalWords.indexOf(num);
      if (num) {
         let finalGoal = {
            name: goalName,
            due: dueDate,
            numToComplete: parseInt(num),
            units: goalWords[numIdx + 1],
            subCompleted: goals[idx] && !isNaN(goals[idx].subCompleted) ? goals[idx].subCompleted : 0,
            subGoals: subGoals,
         }
         console.log(idx)
         console.log(finalGoal)
         let tempGoal = [...goals]
         if (!isNaN(idx)) {
            tempGoal[idx] = finalGoal
         } else {
            tempGoal = tempGoal.concat([finalGoal])
         }
         setGoals(tempGoal)
         navigation.navigate('ClassPage', {newGoal: finalGoal, idx})
      } else {
         console.log("Bad")
      }
   }



   subGoals.forEach((goal, idx) => {
      let subGoalCmp = 
         <ListGroup.Item>
            <Form.Group controlId={idx}>
               <Row>
                  <Col sm={1}>
                     <Form.Label>Title</Form.Label>
                  </Col>
                  <Col sm={9}>
                     <Form.Control
                     id={idx}
                     value={goal.title} 
                     type="text" 
                     placeholder="Subgoal Title"
                     onChange={handleChange} />
                  </Col>
                  <Col sm={2}>
                     <Button variant="primary">
                        Delete
                     </Button>
                  </Col>
               </Row>
            </Form.Group>
         </ListGroup.Item>
      subGoalCmps.push(subGoalCmp)
   });

   
   


   return(
      <View className={"center"}>
         <h2>{isNaN(idx)? "Make Goal" : "Edit Goal"}</h2>
         <Form>
            <Form.Group controlId="goal">
               <Form.Label>Title</Form.Label>
               <Form.Control 
                type="text" 
                placeholder="Goal Title"
                value={goalName}
                onChange={(ev) => {setGoalName(ev.target.value)}} />
               <Form.Label>Due Date</Form.Label>
               <Form.Control 
                type="date" 
                placeholder="9/21/3000"
                value={dueDate}
                onChange={(ev) => {setDueDate(ev.target.value)}} />
            </Form.Group>
            <Form.Group controlId="goal">
               <ListGroup>
                  {subGoalCmps}
                  <ListGroup.Item key={subGoalCmps.length}>
                     <Row>
                        <Col sm={4}>
                           <Button 
                            variant="primary"
                            onClick={addSubGoal}>
                              Add Subgoal
                           </Button>
                        </Col>
                        <Col sm={8}>
                        </Col>
                     </Row>
                  </ListGroup.Item>
               </ListGroup>
            </Form.Group>
            <Button 
             variant="primary" 
             type="submit"
             onClick={submit}>
               Submit
            </Button>
         </Form>
      </View>
   )
}

export default CreateGoalPage;