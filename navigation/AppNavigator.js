import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/Quiz/QuizPage';
import SignUpScreen from '../screens/authentication/SignUp';
import QuizResults from '../screens/Quiz/QuizResults';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
      <AppStack.Screen name="QuizResults" component={QuizResults} />
    </AppStack.Navigator>
  );
}