import { Typography } from '@material-ui/core';
import React from 'react';



let ImageTask = function({ pth, title }) {

   return (
      <div>
          <Typography class="componentHeader" variant="h4" component="h4">
              {title}
          </Typography>
          <img src={pth} class="img-fluid"/>
      </div>
  );
}

export default ImageTask;