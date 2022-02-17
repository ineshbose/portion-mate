import React from 'react';
import { Button, Input } from '@ui-kitten/components';
import { AuthError } from '../../types/api';
import { useAppContext } from '../../contexts';
import { RootAuthScreenProps } from '../../types/navigation';
import AuthForm from './AuthForm';
import styles, { passwordAccessory, SwitchForm } from './FormStyle';

export default function LoginForm({
  navigation,
}: RootAuthScreenProps<'Login'>) {
  const {
    helpers: { signIn },
  } = useAppContext();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AuthError>();

  return (
    <AuthForm error={error}>
      <Input
        placeholder="email"
        onChangeText={setEmail}
        style={styles.formElement}
      />
      <Input
        placeholder="password"
        onChangeText={setPassword}
        accessoryRight={(props) =>
          passwordAccessory(props, setPasswordVisible, passwordVisible)
        }
        secureTextEntry={!passwordVisible}
        style={styles.formElement}
      />
      <Button
        onPress={() => signIn(email, password).catch(setError)}
        style={[styles.formElement, styles.loginButton]}
      >
        log in
      </Button>
      <SwitchForm navigation={navigation} page="Register" />
    </AuthForm>
  );
}
