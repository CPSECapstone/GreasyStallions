import React from 'react';
import Form from 'react-bootstrap/Form';

/*
   Free response question task page.
   Still need to save the answer after submission.
*/

let freeResponseAnswer = "";

let FreeResponseTask = function({ freeResponseQuestion }) {

   return (
      <Form>
         <Form.Group controlId="freeResponseTextArea">
            <Form.Label> {freeResponseQuestion} </Form.Label>
            <Form.Control as="textarea" rows={6} placeholder="Type your response here..." />
         </Form.Group>
      </Form>
   );
}

export default FreeResponseTask;