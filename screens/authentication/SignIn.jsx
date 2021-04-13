import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Alert, Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Styles from '../../styles/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    display: true
  },
});

export default function SignIn({ navigation, signIn: signInCb }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async () => {
    if (email.length > 4 && password.length > 2) {
      await Auth.signIn(email, password)
        .then((user) => {
          signInCb(user);
        })
        .catch((err) => {
          if (!err.message) {
            console.log('1 Error when signing in: ', err);
            Alert.alert('Error when signing in: ', err);
          } else {
            if (err.code === 'UserNotConfirmedException') {
              console.log('User not confirmed');
              navigation.navigate('Confirmation', {
                email,
              });
            }
            if (err.message) {
              setErrorMessage(err.message);
            }
          }
        });
    } else {
      setErrorMessage('Provide a valid email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={(text) => onChangeEmail(text)}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
        testID='login-input'
      />
      <Input
        value={password}
        placeholder="password"
        onChange={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
        testID='password-input'
      />
      
      <View>
      <Button
        testID='signin-button'
        onPress={() => signIn()}
      >
        Sign In
      </Button>
      </View>

      <Text>{errorMessage}</Text>

      <View>
      <Button onPress={() => navigation.navigate('ForgetPassword')}>
        Forget Password
      </Button>
      </View>
    </View>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};