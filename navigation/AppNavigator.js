import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import InstructorHome from '../screens/Instructor/InstructorHome';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/Quiz/QuizPage';
import QuizVideo from '../screens/Quiz/QuizVideo';
import QuizResults from '../screens/Quiz/QuizResults';
import Welcome from '../screens/Welcome';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Welcome" component={Welcome} signOut={signOut}/>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}/>
      <AppStack.Screen name="InstructorHome" component={InstructorHome} signOut={signOut}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="QuizVideo" component={QuizVideo}/>
      <AppStack.Screen name="QuizResults" component={QuizResults} />
    </AppStack.Navigator>
  );
}