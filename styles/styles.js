import {StyleSheet} from 'react-native';

import Colors from './colors';

const Styles = StyleSheet.create({
  taskPageComponentBackgroundDG: {
    backgroundColor: "#F2F2F2"
  },
  taskPageComponentBackgroundLG: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    alignItems: 'left',
    alignContent: 'center',
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  
  section: {
    alignSelf: 'center',
  },

  // Text styles
  taskTitleText: {
    color: Colors.blue,
  }
});

export default Styles;
