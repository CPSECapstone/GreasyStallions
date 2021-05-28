import * as React from 'react';
import { Text } from 'react-native'
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

let DatePickerTest = ({date, setDate}) => {
  // const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <>
      <Button onPress={() => setOpen(true)} 
       uppercase={false} 
       mode="outlined"
       style={{margin: "1%"}}>
        <Text>{date ? "Due on: " + date.toString(): "Pick Due Date"}</Text>
      </Button>
      <DatePickerModal
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
    </>
  );
}
export default DatePickerTest