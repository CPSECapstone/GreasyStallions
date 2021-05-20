import { Typography } from '@material-ui/core';
import React from 'react';



let ImageTask = function({ pth, title }) {

    return (
        <div>
          <Typography class="componentHeader" variant="h4" component="h4">
              {title}
          </Typography>
          <img
            style={{ resizeMode: "center"}}
            src={pth} class="img-thumbnail"
          />
        </div>
    );
}

export default ImageTask;