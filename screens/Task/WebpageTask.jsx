import React from 'react';
import {WebView} from 'react-native-web-webview';

let WebpageTask = function({ webpageUrl }) {

   console.log(webpageUrl)
   return (
      <WebView
         source={{ uri: webpageUrl }}
         style={{ marginTop: 40, flex:1 }} 
      />
   );
}

export default WebpageTask;