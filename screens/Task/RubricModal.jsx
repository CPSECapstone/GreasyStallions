import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export default function RubricModal() {
	const [show, setShow] = useState(false)

	// const containerStyle = {backgroundColor: 'white', padding: 20};
	return (
		<View style={styles.container}>
			<Modal visible={show} onDismiss={() =>setShow(false)} /* contentContainerStyle={containerStyle} */>
				<Text>Example Modal.  Click outside this area to dismiss.</Text>
			</Modal>
		</View>
	)
}

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