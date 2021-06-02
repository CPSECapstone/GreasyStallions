import { TextInput } from 'react-native-paper';
import React from 'react';


/*
	Free response question task page.
	Still need to save the answer after submission.
*/

let freeResponseAnswer = "";

let FreeResponseTask = function({ freeResponseQuestion }) {

	return (
		<View>
			<TextInput
				label={freeResponseQuestion}
				multiline
			/>
		</View>
	);
}

export default FreeResponseTask;