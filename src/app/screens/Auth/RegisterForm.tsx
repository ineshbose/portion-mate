import * as React from 'react';
import { Button, Input } from 'react-native-elements';
import { RootAuthScreenProps } from '../../types/navigation';
import { useAuth } from '../../contexts/Auth';
import AuthForm from './AuthForm';
import FormStyle from './FormStyle';

export default function RegisterForm({
  navigation,
}: RootAuthScreenProps<'Register'>) {
  const { loading, signUp } = useAuth();
  const [email, setEmail] = React.useState<string>('');
  const [forename, setForename] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<any>();

  return (
    <AuthForm>
      <Input
        placeholder="email"
        containerStyle={FormStyle.input}
        onChangeText={setEmail}
        errorMessage={error?.email}
      />
      <Input
        placeholder="forename"
        containerStyle={FormStyle.input}
        onChangeText={setForename}
      />
      <Input
        placeholder="surname"
        containerStyle={FormStyle.input}
        onChangeText={setSurname}
      />
      <Input
        placeholder="password"
        containerStyle={FormStyle.input}
        onChangeText={setPassword}
        errorMessage={error?.password}
        secureTextEntry
      />
      <Input
        placeholder="confirm password"
        containerStyle={FormStyle.input}
        onChangeText={setConfirmPassword}
        errorMessage={
          confirmPassword && confirmPassword !== password
            ? 'Does not match with your password.'
            : ''
        }
        secureTextEntry
      />
      <Button
        title="register"
        loading={loading}
        buttonStyle={FormStyle.submit}
        onPress={() =>
          password && confirmPassword === password
            ? signUp(email, password, forename, surname).catch(setError)
            : {}
        }
      />
      <Button
        title="log into existing account"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={FormStyle.switch}
      />
    </AuthForm>
  );
}
