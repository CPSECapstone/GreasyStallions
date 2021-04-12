import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/Quiz/QuizPage';
import QuizVideo from '../screens/Quiz/QuizVideo';
import SignUpScreen from '../screens/authentication/SignUp';
import QuizResults from '../screens/Quiz/QuizResults';
import CreateGoalPage from '../screens/Goals/CreateGoalPage';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="QuizVideo" component={QuizVideo}/>
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
      <AppStack.Screen name="QuizResults" component={QuizResults} />
      <AppStack.Screen name="CreateGoalPage" component={CreateGoalPage}/>
    </AppStack.Navigator>
  );
}