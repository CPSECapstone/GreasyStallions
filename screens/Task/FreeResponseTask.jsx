import React from 'react';
import Form from 'react-bootstrap/Form';


/*
   free response quiz task
*/

let freeResponseAnswer = "";

let FreeResponseTask = function({ freeResponseQuestion }) {

   return (
      <Form>
         <Form.Group controlId="formBasicEmail">
         <Form.Label> {freeResponseQuestion} </Form.Label>
         <Form.Control placeholder="Type your response here..." />
         </Form.Group>
      </Form>
   );
}





export default FreeResponseTask;