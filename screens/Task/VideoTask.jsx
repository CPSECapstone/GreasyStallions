import React from 'react';

/**
 * Displays a youtube video, note: the link must be for the embedded format not 
 * the general url 
 */

let VideoTask = function({ id, title }) {

   return (
      <div>
         <h2>{title}</h2>
         <div class="embed-responsive embed-responsive-16by9">
            <iframe width="1024" height="576" class="embed-responsive-item" 
            src={id} allowFullScreen autoplay></iframe>
         </div>
      </div>
   );
}

export default VideoTask;