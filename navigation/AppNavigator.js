import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/QuizPage';
import WelcomeScreen from '../screens/authentication/Welcome';
import Welcome from '../screens/authentication/Welcome';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="Welcome" component={Welcome}/>
    </AppStack.Navigator>
  );
}