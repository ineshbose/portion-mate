import * as React from 'react';
import { Button, Input } from 'react-native-elements';
import { RootAuthScreenProps } from '../../types';
import AuthForm from './AuthForm';
import FormStyle from './FormStyle';

export default function RegisterForm({
  navigation,
}: RootAuthScreenProps<'Register'>) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <AuthForm>
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
      <Button
        title="register"
        buttonStyle={FormStyle.submit}
        onPress={() => console.log(email, name)}
      />
      <Button
        title="log into existing account"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={FormStyle.switch}
      />
    </AuthForm>
  );
}
