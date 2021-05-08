import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import Icon from 'react-native-vector-icons/Octicons';
import MissionPage from '../screens/Mission/MissionPage';
import SettingsPage from '../screens/SettingsPage';
import { View, Text, Button, Image } from 'react-native';

const AppStack = createStackNavigator();

const MainStackNavigator = (props, signOut) => {
    return(
    <AppStack.Navigator
     screenOptions={{
      //headerTitle: "Hello " + JSON.stringify(user.attributes.name),
      //headerTitle: props => <LogoTitle {...props} />,
      headerRight: () => (
        <View style={{paddingRight:20}}>
        <Icon 
        name='three-bars' 
        size={30} 
        color='#000' 
        onPress={() => props.navigation.toggleDrawer()}
        />
        </View>
        // <Button title="Toggle drawer" onPress={() => props.navigation.toggleDrawer()} />
        // <Button title="Sign Out" onPress={() => Auth.signOut()} color = 'red'/>
      )
     }}>
      <AppStack.Screen name="Welcome" component={Welcome} signOut={signOut}
      options={{
        headerShown:false
      }}/>
      <AppStack.Screen name="Home" component={Home} signOut={signOut}
      options={{
        headerLeft:null
      }}/>
      <AppStack.Screen name="InstructorHome" component={InstructorHome} signOut={signOut}
      options={{
        headerLeft:null
      }}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="QuizPage" component={QuizPage}/>
      <AppStack.Screen name="QuizVideo" component={QuizVideo}/>
      <AppStack.Screen name="QuizResults" component={QuizResults} />
      <AppStack.Screen name="TaskPage" component={TaskPage}/>
      <AppStack.Screen name="CreateGoalPage" component={CreateGoalPage}/>
      <AppStack.Screen name="Profile" component={Profile}/>
      <AppStack.Screen name="MissionPage" component={MissionPage}/>
      <AppStack.Screen name="SettingsPage" component={SettingsPage}/>
    </AppStack.Navigator>
    )
}

export {MainStackNavigator}