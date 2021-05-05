import React from 'react';
import {DrawerNavigator} from './DrawerNavigator'
import { NavigationContainer } from '@react-navigation/native';

export default function App({ signOut, navigation }) {
  return (
    <NavigationContainer independent={true}>
    <DrawerNavigator />
    </NavigationContainer>
  );
}