import React from 'react';

/**
 * Displayes a youtube video, note: the link must be for the emebeded format not 
 * the gereral url 
 */

/**
 * Displayes a youtube video, note: the link must be for the emebeded format not 
 * the gereral url 
 */

let VideoTask = function({ id }) {

   return (
      <div class="embed-responsive embed-responsive-16by9">
         <iframe width="1024" height="576" class="embed-responsive-item" 
          src={id} allowFullScreen autoplay></iframe>
      </div>
   );
}

export default VideoTask;