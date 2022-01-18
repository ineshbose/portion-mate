import * as React from 'react';
import { Button, Card, Input, Text } from 'react-native-elements';
import { AuthError } from '../../types/api';
import { useAuth } from '../../contexts/Auth';
import { RootAuthScreenProps } from '../../types/navigation';
import AuthForm from './AuthForm';
import FormStyle from './FormStyle';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<AuthError>();

  return (
    <AuthForm>
      {error && (
        <Card>
          <Text>{error?.error_description}</Text>
        </Card>
      )}
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
        onPress={() => signIn(email, password).catch(setError)}
      />
      <Button
        title="create account"
        onPress={() => navigation.navigate('Register')}
        buttonStyle={FormStyle.switch}
      />
    </AuthForm>
  );
}
