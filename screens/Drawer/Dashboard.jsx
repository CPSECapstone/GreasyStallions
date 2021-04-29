import React from 'react';

class Dashboard extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
        headerTitle: 'Dashboard@@',
        headerLeft: <Text>Left</Text>,
        headerRight: (
          <Button onPress = {navigation.toggleDrawer}
          title="Menu"
          color="#fff">
            <Text>Menu</Text>
          </Button>
        ),
        headerTitleStyle: {
          flex: 1,
          color: '#fff',
          textAlign: 'center',
          alignSelf: 'center',
          fontWeight: 'normal',
        },
  
        headerStyle: {
          backgroundColor: '#b5259e',
        },
      }
    }}