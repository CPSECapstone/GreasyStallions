import React from 'react';
import {ListGroup, ProgressBar, Col, Row} from 'react-bootstrap'


// Goal Progress Bar for GoalListStudent that hides on teacher view
let OverallGoalProgressBar = ({goalProgress, goalsLength, showBar}) => {
   let goalProgressPercentage = goalProgress / goalsLength * 100
   return (
      <div>
         {showBar ?
         <ListGroup.Item>
            <Row>
               <Col sm={5}>
                  <h3>
                     Overall Goal Progress
                  </h3>
               </Col>
               <Col sm={7}>
                  <ProgressBar now={goalProgressPercentage} 
                     label={`${Number((parseFloat(goalProgressPercentage)).toFixed(2))}%`} />
               </Col>
            </Row>
         </ListGroup.Item> : <div></div>}
      </div>
   )
}

export default OverallGoalProgressBar;