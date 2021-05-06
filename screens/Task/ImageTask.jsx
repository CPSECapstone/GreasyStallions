import React from 'react';



let ImageTask = function({ pth, title }) {

   return (
      <div>
         <h2>{title}</h2>
         <img src={pth} class="img-fluid"/>
      </div>
   );
}

export default ImageTask;