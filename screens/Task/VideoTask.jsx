import React from 'react';
import { iframe } from 'react-bootstrap';
import YoutubePlayer from 'react-native-youtube-iframe';

let VideoTask = function({ id }) {

   return (
      <div class="embed-responsive embed-responsive-16by9">
         <iframe width="1280" height="720" class="embed-responsive-item" 
          src={id} allowFullScreen autoplay></iframe>
      </div>
   );
 }

 export default VideoTask;