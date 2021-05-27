import React from "react";
import Profile from '../screens/Drawer/Profile';
import { MainStackNavigator } from "./StackNavigator";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { View, Text, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
        <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    );
  }
  
  function CustomDrawerContent(props, signOut) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
         label="Home"
         onPress={() => props.navigation.navigate("Home")}/>
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Goals"
          onPress={() => props.navigation.navigate("GoalPage")}
        />
        {/* <View style={{paddingRight:20}}>
        <Icon 
        name='three-bars' 
        size={30} 
        color='#000'></Icon>
        </View> */}
        <DrawerItem
          label="Sign Out"
          onPress={() => Auth.signOut()}
        //   onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerContentScrollView>
    );
  }  

const DrawerNavigator = (navigation) => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Flipt(ed)" component={MainStackNavigator}/>
      {/* <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Profile" component={Profile} /> */}
    </Drawer.Navigator>
  );
}

export {DrawerNavigator}
// export default DrawerNavigator;