import React, { useState } from 'react';
import {
  View, StyleSheet, Text, ScrollView, SafeAreaView,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Input from '../../components/Input';
import {Container, Col, Row, Form, Button, FormLabel, FormControl, ListGroupItem, ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%'
  }
});

export default function SignUp({ navigation }) {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [repeatPassword, onChangeRepeatPassword] = useState('');
  //const [userType, onChangeUserType] = usestate('');

  const [invalidMessage, setInvalidMessage] = useState(null);

  const signUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
        },
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          if (err.message) {
            setInvalidMessage(err.message);
          }
          console.log(err);
        });
    } else {
      setInvalidMessage('Password must be equal and have greater lenght than 6.');
    }
  };

  return (
    <Container fluid="md">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder = "First Name" 
              value={name} 
              onChange={(text) => onChangeName(text)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastName" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder = "Last Name"/>
          </Form.Group>
          <Form.Group as={Col} controlId="formTorS">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              id="teacherorstudent"
              custom
            >
              <option value="0">Student</option>
              <option value="1">Teacher</option>  
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            value={email} 
            type="email" 
            placeholder="Enter email" 
            onChange={(text) => onChangeEmail(text)} 
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              value={password} 
              type="password" 
              palceholder="Password" 
              onChange={(text) => onChangePassword(text)} 
              aria-describedby="passwordHelpBlock"  
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formRepeatPassword">
            <Form.Label>Confirm</Form.Label>
            <Form.Control 
              value={repeatPassword}
              type="password"
              palceholder="Password" 
              onChange={(text) => onChangeRepeatPassword(text)} 
            />
          </Form.Group>
        </Form.Row>
        <Form.Text id="passwordHelpBlock" muted>
          Use between 6-20 characters with a mix of letters, numbers and symbols
        </Form.Text>
        <Button 
          type="submit" 
          onPress={() => signUp()}
          variant="outline-dark"
        >Submit</Button>
      </Form>
    </Container>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.content}>
  //       <Input
  //         value={name}
  //         placeholder="Name"
  //         onChange={(text) => onChangeName(text)}
  //         autoFocus
  //       />
  //       <Input
  //         value={email}
  //         placeholder="email@example.com"
  //         onChange={(text) => onChangeEmail(text)}
  //         autoCapitalize="none"
  //         autoCompleteType="email"
  //         keyboardType="email-address"
  //       />
  //       <Input
  //         value={password}
  //         placeholder="password"
  //         onChange={(text) => onChangePassword(text)}
  //         secureTextEntry
  //         autoCompleteType="password"
  //       />
  //       <Input
  //         value={repeatPassword}
  //         placeholder="Repeat password"
  //         onChange={(text) => onChangeRepeatPassword(text)}
  //         secureTextEntry
  //         autoCompleteType="password"
  //       />
  //       <Button
  //         onPress={() => signUp()}
  //       >
  //         Sign Up
  //       </Button>
  //       <Text>
  //         {invalidMessage}
  //       </Text>
  //     </View>
  //   </View>
  // );
}