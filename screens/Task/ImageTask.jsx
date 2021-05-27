import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

let ImageTask = function({ pth, title }) {

   return (
      <View style={styles.container}>
         <Image
          source={pth}
         />
      </View>
   );
}

export default ImageTask;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  textAlign: 'center'
	},
  });