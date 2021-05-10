import React from 'react';
import { Typography }from '@material-ui/core';

/**
 * Displays a youtube video, note: the link must be for the embedded format not 
 * the general url 
 */

let VideoTask = function({ id, title }) {

   let embededLink = "";
   let getEmbededLink = () => {
      let out = id.indexOf(".be/");
      embededLink = "https://www.youtube.com/embed/" + id.substring(out+4);
   }

   return (
      <div>
         {getEmbededLink()}
         <Typography class="componentHeader" variant="h4" component="h4">
            {title}
         </Typography>
         <div class="embed-responsive embed-responsive-16by9">
            <iframe width="1024" height="576" class="embed-responsive-item" 
            src={embededLink} allowFullScreen autoplay></iframe>
         </div>
      </div>
   );
}

export default VideoTask;