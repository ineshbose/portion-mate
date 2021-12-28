/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Button, Card, Input } from 'react-native-elements';
import { RootAuthScreenProps } from '../../types';
import FormStyle from './FormStyle';
import Logo from './Logo';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Card containerStyle={FormStyle.container}>
      <Logo />
      <Input
        placeholder="email"
        containerStyle={FormStyle.input}
        onChangeText={setEmail}
      />
      <Input
        placeholder="password"
        containerStyle={FormStyle.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="log in" buttonStyle={FormStyle.submit} />
      <Button
        title="create account"
        onPress={() => navigation.navigate('Register')}
        buttonStyle={FormStyle.switch}
      />
    </Card>
  );
}
