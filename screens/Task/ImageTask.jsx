import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

let ImageTask = function({ pth, title }) {

   return (
      <View>
         <Text>
            {title}
         </Text>
         <Image style={styles.image} source={pth} class="img-fluid"/>
      </View>
   );
}

export default ImageTask;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	}, image: {
      flex: 1,
   },
	text: {
	  textAlign: 'center'
	},surface: {
      width: "100%",
      flex: 1,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
    },
  });