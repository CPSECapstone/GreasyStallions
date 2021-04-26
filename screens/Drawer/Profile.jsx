import React from 'react';
import { View } from 'react-native';
import Styles from '../../styles/styles';

// import { Button, Modal} from 'react-bootstrap';

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