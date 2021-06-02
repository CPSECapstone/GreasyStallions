import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentHome from '../screens/Student/StudentHome'; 
import InstructorHome from '../screens/Instructor/InstructorHome';
import ClassPage from '../screens/ClassPage';
import GoalPage from '../screens/Goals/GoalPage';
import Welcome from '../screens/Welcome';
import CreateGoalPage from '../screens/Goals/CreateGoalPage';
import TaskPage from '../screens/Task/TaskPage';
import Profile from '../screens/Drawer/Profile';
import Icon from 'react-native-vector-icons/Octicons';
import MissionPage from '../screens/Mission/MissionPage';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import MasteryOverviewPage from '../screens/Instructor/MasteryOverviewPage';
import InstructorClassPage from '../screens/Instructor/InstructorClassPage';
import { HeaderBackButton } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const MainStackNavigator = (props, signOut) => {
    return(
    <AppStack.Navigator
     screenOptions={{
      //headerTitle: "Hello " + JSON.stringify(user.attributes.name),
      //headerTitle: props => <LogoTitle {...props} />,
      // headerLeft: () => (
      //   <View style={styles.iconContainer}>
      //   <Icon 
      //   containerStyle={styles.icon}
      //   paddingLeft={40}
      //   paddingRight={40}
      //   name='three-bars' 
      //   size={30} 
      //   color='#000' 
      //   onPress={() => props.navigation.toggleDrawer()}
      //   />
      //   <HeaderBackButton containerStyle={styles.icon}
      //   paddingLeft={60}
      //   paddingRight={40}
      //   {...props} onPress={() => props.navigation.goBack()} />
      //   </View>
      // )
      headerRight: () => (
        <View style={{paddingRight:20}}>
        <Icon 
        name='three-bars' 
        size={30} 
        color='#000' 
        onPress={() => props.navigation.toggleDrawer()}
        />
        </View>
      )
      }}>
      <AppStack.Screen name="Welcome" component={Welcome} signOut={signOut}
      options={{
        headerShown:false
      }}/>
      <AppStack.Screen name="StudentHome" component={StudentHome} signOut={signOut}
      options={{
        headerLeft:null
      }}/>
      <AppStack.Screen name="InstructorHome" component={InstructorHome} signOut={signOut}
      options={{
        headerLeft:null
      }}/>
      <AppStack.Screen name="ClassPage" component={ClassPage}/>
      <AppStack.Screen name="TaskPage" component={TaskPage}/>
      <AppStack.Screen name="CreateGoalPage" component={CreateGoalPage}/>
      <AppStack.Screen name="Profile" component={Profile}/>
      <AppStack.Screen name="GoalPage" component={GoalPage}/>
      <AppStack.Screen name="MissionPage" component={MissionPage}/>
      <AppStack.Screen name="InstructorClassPage" component={InstructorClassPage}/>
      <AppStack.Screen name="MasteryOverviewPage" component={MasteryOverviewPage}/>
    </AppStack.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 40
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 80,
    paddingLeft: 20
  }
});

export {MainStackNavigator}