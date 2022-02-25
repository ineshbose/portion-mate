import React from 'react';
import { Linking } from 'react-native';
import { Button, CheckBox, Input, Text } from '@ui-kitten/components';
import { RootAuthScreenProps } from '../../types/navigation';
import { useAppContext } from '../../contexts';
import { FormError } from '../../types/api';
import AuthForm from './AuthForm';
import styles, { passwordAccessory, SwitchForm } from './FormStyle';

export default function RegisterForm({
  navigation,
}: RootAuthScreenProps<'Register'>) {
  const {
    helpers: { signUp },
  } = useAppContext();
  const [email, setEmail] = React.useState<string>('');
  const [forename, setForename] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [agreedTerms, setAgreedTerms] = React.useState<boolean>(false);
  const [error, setError] = React.useState<FormError | any>();

  return (
    <AuthForm>
      <Input
        placeholder="email"
        onChangeText={setEmail}
        caption={error?.email}
        status={error?.email ? 'danger' : 'basic'}
        style={styles.formElement}
      />
      <Input
        placeholder="forename"
        onChangeText={setForename}
        style={styles.formElement}
      />
      <Input
        placeholder="surname"
        onChangeText={setSurname}
        style={styles.formElement}
      />
      <Input
        placeholder="password"
        onChangeText={setPassword}
        caption={error?.password}
        status={error?.password ? 'danger' : 'basic'}
        accessoryRight={(props) =>
          passwordAccessory(props, setPasswordVisible, passwordVisible)
        }
        secureTextEntry={!passwordVisible}
        style={styles.formElement}
      />
      <Input
        placeholder="confirm password"
        onChangeText={setConfirmPassword}
        caption={
          error?.confirmPassword ||
          (confirmPassword && confirmPassword !== password
            ? 'Does not match with your password.'
            : '')
        }
        status={
          error?.confirmPassword ||
          (confirmPassword && confirmPassword !== password)
            ? 'danger'
            : 'basic'
        }
        accessoryRight={(props) =>
          passwordAccessory(props, setPasswordVisible, passwordVisible)
        }
        secureTextEntry={!passwordVisible}
        style={styles.formElement}
      />
      <CheckBox
        checked={agreedTerms}
        onChange={setAgreedTerms}
        status={error?.agreedTerms && !agreedTerms ? 'danger' : 'primary'}
        style={styles.agreedSpacing}
      >
        <>
          <Text style={styles.agreedTextSpacing}>
            {'I read and agree to the'}
          </Text>
          <Text
            onPress={() =>
              Linking.openURL(
                'https://portion-mate.readthedocs.io/en/latest/Terms/'
              )
            }
          >
            {'Terms & Conditions'}
          </Text>
        </>
      </CheckBox>
      <Button
        onPress={() =>
          agreedTerms && password && confirmPassword === password
            ? signUp(email, password, forename, surname).catch(setError)
            : setError({
                agreedTerms: 'This field is required',
                email: 'This field is required',
                password: 'This field is required',
                confirmPassword: 'This field is required',
              })
        }
        style={styles.formElement}
      >
        register
      </Button>
      <SwitchForm navigation={navigation} page="Login" />
    </AuthForm>
  );
}
