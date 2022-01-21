import * as React from 'react';
import { Button, Card, Input, Text } from '@ui-kitten/components';
import { AuthError } from '../../types/api';
import { useAppContext } from '../../contexts/AppContext';
import { RootAuthScreenProps } from '../../types/navigation';
import AuthForm from './AuthForm';
import FormStyle from './FormStyle';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const {
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
        buttonStyle={FormStyle.submit}
        onPress={() => signIn(email, password).catch(setError)}
      >
        log in
      </Button>
      <Button
        onPress={() => navigation.navigate('Register')}
        buttonStyle={FormStyle.switch}
      >
        create account
      </Button>
    </AuthForm>
  );
}
