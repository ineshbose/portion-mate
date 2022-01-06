/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Button, Card, Input } from 'react-native-elements';
import { getToken } from '../../api/auth';
import { AuthError } from '../../api/types';
import { useAuth } from '../../contexts/Auth';
import { RootAuthScreenProps } from '../../types';
import FormStyle from './FormStyle';
import Logo from './Logo';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const auth = useAuth();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [error, setError] = React.useState<AuthError>();

  return (
    <Card containerStyle={FormStyle.container}>
      <Logo />
      {error && <Card>{error?.error_description}</Card>}
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
      <Button
        title="log in"
        buttonStyle={FormStyle.submit}
        onPress={() =>
          auth.signIn(email as string, password as string).catch(setError)
        }
      />
      <Button
        title="create account"
        onPress={() => navigation.navigate('Register')}
        buttonStyle={FormStyle.switch}
      />
    </Card>
  );
}
