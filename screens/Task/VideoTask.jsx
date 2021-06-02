import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';

let VideoTask = function({ id, title }) {

	let embeddedLink = "";
	let getEmbeddedLink = () => {
	   let out = id.indexOf(".be/");
	   embeddedLink = "https://www.youtube.com/embed/" + id.substring(out+4);
	}

	return (
	   <View>
		  {getEmbeddedLink()}
		  <Text style={styles.header}>
			 {title}
		  </Text>

		  <WebView 
        	originWhitelist={['*']} 
    	    source={{ html: "<iFrame src=embeddedLink />" }} />

	   </View>
	);
}

{/* 
<div class="embed-responsive embed-responsive-16by9">
	<iframe width="1024" height="576" class="embed-responsive-item" 
	src={embeddedLink} allowFullScreen autoplay></iframe>
</div> 
*/}

export default VideoTask;

const styles = StyleSheet.create({
	section: {
	  padding:16,
	},
	header: {
	  marginLeft: 50,
	  flex: 1,
	  width: "100%",
	  alignSelf: 'center'
	},
	text: {
	  textAlign: 'left',
	  fontSize: 28,
	  paddingTop: 20
	},
	buttons: {
	  width: 100,
	  backgroundColor: '#99004d',
	  marginTop: 20
	},
	buttonText: {
	  width: "15%",
	  marginLeft: 0,
	  alignSelf: 'center'
	},
	coursebutton: {
	  marginTop: 16,
	  padding: 8,
	  height: 100,
	  width: 250,
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#3467EC'
	}
});