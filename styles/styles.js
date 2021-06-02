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
	}

});

export default Styles;
