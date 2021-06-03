import {StyleSheet} from 'react-native';

import Colors from './colors';

const Styles = StyleSheet.create({
  taskPageComponentBackgroundDG: {
    backgroundColor: "#F2F2F2"
  },
  taskPageComponentBackgroundLG: {
    backgroundColor: "#FFFFFF"
  },
  taskContainer: {
    alignItems: 'flex-start',
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
	containerTask: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
    padding: 16,
    width: '100%'
	},
  container: {
	  flex: 1,
	  width: '100%',
    justifyContent: 'flex-start',
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
    width: '100%',
		paddingLeft: '10%',
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
      },
  
  TaskListContainer: { 
    paddingLeft: "8%",
    paddingTop: "1%",
    paddingBottom: "1%",
  }, 
  blueLine: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9BC9FF",
  },

  // Text styles
  missionTitleText: {
    color: Colors.blueTitle,
    paddingLeft: "5%",
  }, 
  targetItemText: {
    paddingLeft: "5%",
  },
  taskTitleText: {
    color: Colors.blue,
  },
  taskPageTitle: {
    color: Colors.blueTitle,
    textAlign: 'center',
    backgroundColor: "#FFFFFF",
    marginTop: 0,
    marginBottom: 0,
  },
  masteryname: {
    flex: 1,
    maxWidth: 200,
    height: 40,
    paddingLeft: 10
  },
  masteryrow: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    margin: 5
  },
  masteryprogressbar: {
    flex: 1,
    height: 40,
    marginLeft: '1%',
    marginRight: '1%',
  },
  masterybar: {
    color: Colors.red,
    backgroundColor: Colors.light_gray,
    height: 40,
    borderRadius: 10
  },
  masterycontainer: {
    width: '100%',
    flex: 1
  },
  masterytargetname: {
    flex: 1,
    textAlign: 'center'
  },
  masterycolumn: {
    borderRadius: 10,
    flex: 1,
    marginLeft: '2%',
    marginRight: '1%',
  }
});

export default Styles;
