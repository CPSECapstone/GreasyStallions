import {  TextField } from '@material-ui/core';
import React from 'react';


/*
   Free response question task page.
   Still need to save the answer after submission.
*/

let freeResponseAnswer = "";

let FreeResponseTask = function({ freeResponseQuestion }) {

   return (
      <div>
         <TextField
          label={freeResponseQuestion}
          variant="outlined"
          fullWidth
          multiline
          rows={6} />
      </div>
   );
}

export default FreeResponseTask;