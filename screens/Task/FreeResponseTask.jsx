import React from 'react';
import {TextInput, Text, View} from 'react-native';

/*
   free response quiz task
*/

let FreeResponseTask = function({ freeResponseQuestion }) {

   return (
      <Text>
         {freeResponseQuestion}
         {"\n"}
         Type your answer below:
         <TextInput/>
      </Text>
   );
}

export default FreeResponseTask;