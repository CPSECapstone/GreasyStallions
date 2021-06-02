import {StyleSheet} from 'react-native';

import Colors from './colors';

const Styles = StyleSheet.create({

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
  circle:{
		margin: 10,
		flexDirection: 'row'
	},
	grid: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: "wrap",
    justifyContent: 'center'
	},
  container: {
	  flex: 1,
	  width: '100%',
    justifyContent: 'center',
    padding: 16
	},
  header: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginTop: 16
	},
	info: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	fontSize: 18,
		marginTop: 6
	},
  carrot: {
		marginRight: 32
	},
	  coursebutton: {
		height: 75,
		width: '80%',
		justifyContent: 'center',
		alignSelf: 'flex-end'	
	},
  courseListText: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 24
	},
  webContainer: {
	  flex: 1,
	  width: '100%',
	  marginTop: 12,
	  marginBottom: 32
	},
  webTitleText: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 24
	},
	webHeader: {
		alignSelf: 'flex-start',
	  	textAlign: 'left',
	  	color: '#3467EC',
	  	fontSize: 28,
		marginLeft: 32, 
		marginTop: 32,
		marginBottom: 32
	},
  buttons: {
      width: 100,
      backgroundColor: '#99004d',
      marginTop: 20
    },
  buttonText: {
      width: "15%",
      marginLeft: 0,
      alignSelf: 'center'
    },
  doubleButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      alignSelf: 'flex-start',
        textAlign: 'left',
        color: '#3467EC',
        fontSize: 28,
      marginTop: 16,
      marginLeft: -14,
      marginBottom: 12
    },
    item: {
      alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 18,
      marginLeft: -14
    },
    navbutton: {
		  margin:10,
	  },
    list: {
      flex: 1
      },
    missionlist: {
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: 'center',    
      }

});

export default Styles;
