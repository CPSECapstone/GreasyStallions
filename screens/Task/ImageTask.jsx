import React from 'react';
import { img } from 'react-bootstrap';



let ImageTask = function({ pth, title }) {

   return (
      <div>
         <h2>{title}</h2>
         <img src={pth} class="img-fluid"/>
      </div>
   );
}

export default ImageTask;