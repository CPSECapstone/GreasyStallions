import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import InstructorHome from '../screens/Instructor/InstructorHome';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/Quiz/QuizPage';
import QuizVideo from '../screens/Quiz/QuizVideo';
import QuizWebpage from '../screens/Quiz/QuizWebpage';
import SignUpScreen from '../screens/authentication/SignUp';
import QuizResults from '../screens/Quiz/QuizResults';
import Welcome from '../screens/Welcome';
import CreateGoalPage from '../screens/Goals/CreateGoalPage';
import TaskPage from '../screens/Task/TaskPage';

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
      <AppStack.Screen name="QuizWebpage" component={QuizWebpage}/>
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
      <AppStack.Screen name="QuizResults" component={QuizResults} />
      <AppStack.Screen name="TaskPage" component={TaskPage}/>
      <AppStack.Screen name="CreateGoalPage" component={CreateGoalPage}/>

    </AppStack.Navigator>
  );
}