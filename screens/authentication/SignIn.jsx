import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Alert, Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Styles from '../../styles/styles';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    margin: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    padding: 15,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 10,
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

      <Button
        backgroundColor={Colors.dark}
        width={20}
        height={50}
        name="button-login"
        testID='button-login'
        onPress={() => signIn()}
      >
        Sign In
      </Button>
      <Text>{errorMessage}</Text>
      <Button onPress={() => navigation.navigate('ForgetPassword')}>
        Forget Password
      </Button>
    </View>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};