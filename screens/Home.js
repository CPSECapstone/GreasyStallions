import React from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center'
  },
});

export default function Home({ signOut }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are now authenticated</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </View>
  )
}