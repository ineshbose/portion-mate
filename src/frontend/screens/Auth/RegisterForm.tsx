/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Button, Card, Input } from 'react-native-elements';
import { RootAuthScreenProps } from '../../types';
import FormStyle from './FormStyle';
import Logo from './Logo';

export default function RegisterForm({
  navigation,
}: RootAuthScreenProps<'Register'>) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <Card containerStyle={FormStyle.container}>
      <Logo />
      <Input
        placeholder="email"
        containerStyle={FormStyle.input}
        onChangeText={setEmail}
      />
      <Input
        placeholder="full name"
        containerStyle={FormStyle.input}
        onChangeText={setName}
      />
      <Input
        placeholder="password"
        containerStyle={FormStyle.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="confirm password"
        containerStyle={FormStyle.input}
        onChangeText={setConfirmPassword}
        errorMessage={
          confirmPassword && confirmPassword !== password
            ? 'does not match with your password'
            : ''
        }
        secureTextEntry
      />
      <Button title="register" buttonStyle={FormStyle.submit} />
      <Button
        title="log into existing account"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={FormStyle.switch}
      />
    </Card>
  );
}
