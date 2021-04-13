import React, { useState } from 'react';
import {
    Modal, Button, Form, FormControl, FormGroup
} from 'react-bootstrap';

let CreateGoalModal = function({show, assignments, onDismiss}){
   
   const DEFAULT_ACTIVITY = "select activity" 
   const DEFAULT_TIME_OPTION = "select date"  
   const [activity, setActivity] = useState(DEFAULT_ACTIVITY);
   const [dueBy, setDueBy] = useState(DEFAULT_TIME_OPTION);
   const [valid, setValid] = useState(false);

   let dateOptionsTxt = [
      "Tomorrow", 
      "Two Days From Now",
      "Three Days From Now",
      "Four Days From Now",
      "Next Monday"
   ];

   let activities = [];
   let dateOptions = [];

   let getValidationState = () => {
      return activity !== DEFAULT_ACTIVITY && dueBy !== DEFAULT_TIME_OPTION
   }

   let close = () => {
      console.log(valid)
      if(valid)
         onDismiss({
            assgn: activity,
            time: dueBy
         })
      else
         onDismiss()
   }
   let handleChangeActivity = (e) => {
      setActivity(e.target.value);
      setValid(e.target.value !== DEFAULT_ACTIVITY && dueBy !== DEFAULT_TIME_OPTION)
   }

   let handleChangeDue = (e) => {
      setDueBy(e.target.value);
      setValid(activity !== DEFAULT_ACTIVITY && e.target.value !== DEFAULT_TIME_OPTION)
   }

   activities.push(<option>{DEFAULT_ACTIVITY}</option>)
   assignments.forEach(assn => {
      activities.push(<option>{assn}</option>)
   });
   
   dateOptions.push(<option>{DEFAULT_TIME_OPTION}</option>)
   dateOptionsTxt.forEach(assn => {
      dateOptions.push(<option>{assn}</option>)
   });


   return (
      <Modal show={show} onHide={onDismiss}>
      {console.log(activity + " " + dueBy)}
         <Modal.Header>
            <Modal.Title>Create New Goal</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <FormGroup controlId="formPickActivity"
                /* validationstate={getValidationState()} */>
                  <Form.Label>Select Assignment</Form.Label>
                  <FormControl 
                     as="select"
                     onChange={handleChangeActivity}>
                     {activities}
                  </FormControl>
                  <Form.Label>When do we want to complete this by?</Form.Label>
                  <FormControl as="select"
                   onChange={handleChangeDue}>
                     {dateOptions}
                  </FormControl>
                  <FormControl.Feedback />
               </FormGroup>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button disabled={!valid} onClick={close}>Ok</Button>
            <Button onClick={close}>Cancel</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default CreateGoalModal;

