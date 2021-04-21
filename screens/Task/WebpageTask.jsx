import React from 'react';
import {WebView} from 'react-native-web-webview';

/*
   displays a webpage in-page based on webpageUrl
*/

let WebpageTask = function({ webpageUrl }) {

   return (
      <WebView
         source={{ uri: webpageUrl }}
         style={{ marginTop: 40, flex:1 }} 
      />
   );
}

export default WebpageTask;