import * as React from 'react';
import { Button, Card, Input, Text } from 'react-native-elements';
import { AuthError } from '../../types/api';
import { useAppContext } from '../../contexts/AppContext';
import { RootAuthScreenProps } from '../../types/navigation';
import AuthForm from './AuthForm';
import FormStyle from './FormStyle';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const {
    loading,
    helpers: { signIn },
  } = useAppContext();
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
        loading={loading}
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
