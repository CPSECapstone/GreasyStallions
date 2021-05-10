import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// maybe have these styles in a separate file for use in other pages (home)
const styles = StyleSheet.create({
    header: {
      marginLeft: 50,
      flex: 1,
      width: "100%",
      justifyContent: 'top',
      alignItems: 'left',
      alignSelf: 'center'
    },
    text: {
      textAlign: 'left',
      fontSize: 28,
      fontStyle: 'bold',
      paddingTop: 20
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
    }
  });

let SettingsPage = function({ route, navigation }){

    return (
        <View style = {styles.section}>
            <Text style = {styles.header}>
                Settings{"\n"}
            </Text>
            <Button style = {styles.buttons}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Home</Text>
            </Button>
        </View>
    )
}

export default SettingsPage;