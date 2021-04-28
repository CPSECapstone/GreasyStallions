import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, Image } from 'react-native';
import Home from '../screens/Home';
import InstructorHome from '../screens/Instructor/InstructorHome';
import ClassPage from '../screens/ClassPage';
import QuizPage from '../screens/Quiz/QuizPage';
import QuizVideo from '../screens/Quiz/QuizVideo';
import QuizResults from '../screens/Quiz/QuizResults';
import Welcome from '../screens/Welcome';
import CreateGoalPage from '../screens/Goals/CreateGoalPage';
import TaskPage from '../screens/Task/TaskPage';
import Profile from '../screens/Drawer/Profile';
import Amplify, { Auth, Hub } from 'aws-amplify';


const AppStack = createStackNavigator();

export default function App() {
  return (
    <AppStack.Navigator
    screenOptions={{
      //headerShown:false,
      //headerTitle: "Hello " + JSON.stringify(user.attributes.name),
      //headerTitle: props => <LogoTitle {...props} />,
      //headerCenter: () => (<Button title="Home" onPress={() => Auth.signOut()} color = 'red'/>),
      headerRight: () => (
        <Button title="Sign Out" onPress={() => Auth.signOut()} color = 'red'/>
      ),
    }}
    >
      <AppStack.Screen name="Welcome" component={Welcome} signOut={signOut}
      options={{
        headerShown:false
      }}/>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}/>
      <AppStack.Screen name="InstructorHome" component={InstructorHome} signOut={signOut}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="QuizVideo" component={QuizVideo}/>
      <AppStack.Screen name="QuizResults" component={QuizResults} />
      <AppStack.Screen name="TaskPage" component={TaskPage}/>
      <AppStack.Screen name="CreateGoalPage" component={CreateGoalPage}/>
      <AppStack.Screen name="Profile" component={Profile}/>

    </AppStack.Navigator>
  );
}