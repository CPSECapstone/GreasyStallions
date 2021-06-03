import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Styles from '../../styles/styles';
import Image from 'react-native-scalable-image';

let ImageTask = function({ pth, title }) {

   return (
    <View style = {Styles.taskContainer}>
        <Text style={Styles.header}>
            {title}
        </Text>
        <Image 
          width= '800'
          resizeMode= 'center'
          source={{ uri: pth }}
        />
    </View>
   );
}

export default ImageTask;