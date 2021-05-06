import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../styles/styles';

let Profile = function({ navigation }){
  
  return (
    <View>
    <Text style={[Styles.header, Styles.text_large]}>
        Welcome to Flipted!
    </Text>
    </View>
  );
}

export default Profile;