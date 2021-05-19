import React from "react";
import Profile from '../screens/Drawer/Profile';
import { MainStackNavigator } from "./StackNavigator";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Home from '../screens/Student/StudentHome';
import {Typography, Grid, Box} from '@material-ui/core';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import { ApolloProvider, useQuery, gql} from '@apollo/client';

const Drawer = createDrawerNavigator();
const BASE_PATH = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
const proileImage = 'react_logo.png';
const USER_ROLE = gql
`
{getUser{
	role
  firstName
	email
  }}
`;

const UserInfo = () => {
  //not really accurate because this page is using the old Apollo Client/queries
    const {data, error, loading} = useQuery(USER_ROLE);
    if (error) { console.log('Error fetching user', error); }
    let role = '';
    let email = '';
    let firstName = '';
    if(data){
      email = data.getUser.email;
      firstName = data.getUser.firstName;
      role = data.getUser.role;
    }

    return (
      <View style = {styles.section}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" m={1}>
            Hi {email}!
          </Box>
        </Typography>
      </View>
    );
  }
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
        <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
        />
        
      <UserInfo></UserInfo>
        <DrawerItemList {...props} />
        {/* <View style={{paddingRight:20}}>
        <Icon 
        name='three-bars' 
        size={30} 
        color='#000'></Icon>
      </View> */}
        <DrawerItem
         label="Home"
         onPress={() => props.navigation.navigate("Home")}/>
         <DrawerItem
         label="Goals"
         onPress={() => props.navigation.navigate("GoalPage", {user: "STUDENT"})}/>
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

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  section: {
    justifyContent: 'top',
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export {DrawerNavigator}
// export default DrawerNavigator;