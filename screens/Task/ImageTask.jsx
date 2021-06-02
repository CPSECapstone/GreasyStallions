import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Surface, Text, Title } from 'react-native-paper';
import  Styles  from '../../styles/styles';

let ImageTask = function({ pth, title }) {

   return (
      <View style={Styles.container}>
         <Title style={Styles.taskTitleText}>
            {title}
         </Title>
         <Image style={{width: "75%", height: "500", resizeMode: 'contain'}} source={pth}/>
      </View>
   );
}

export default ImageTask;