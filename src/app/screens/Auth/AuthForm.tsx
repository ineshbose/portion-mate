import * as React from 'react';
import Logo from './Logo';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Input } from '@ui-kitten/components';
import { AuthError } from '../../types/api';
import styles from './FormStyle';

type FormProps = {
  children: (Input | JSX.Element | undefined)[];
  error?: AuthError;
};

export default function AuthForm(formProps: FormProps) {
  const { children, error } = formProps;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo />
      </View>
      <View style={styles.formContainer}>
        {error && (
          <Button
            status="danger"
            appearance="outline"
            style={{ marginVertical: 10 }}
          >
            {error?.error_description}
          </Button>
        )}
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}
