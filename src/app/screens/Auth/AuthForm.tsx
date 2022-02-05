import React from 'react';
import Logo from './Logo';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Input, Layout } from '@ui-kitten/components';
import { AuthError } from '../../types/api';
import styles from './FormStyle';
import { useThemeContext } from '../../contexts/ThemeContext';

type FormProps = {
  children: (Input | JSX.Element | undefined)[];
  error?: AuthError;
};

export default function AuthForm(formProps: FormProps) {
  const { children, error } = formProps;
  const { ThemeToggle } = useThemeContext();

  return (
    <>
      <KeyboardAvoidingView style={[styles.container, { flex: 1 }]}>
        <Layout style={styles.formContainer}>
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
        </Layout>
      </KeyboardAvoidingView>
      <ThemeToggle style={styles.themeToggleStyle} />
    </>
  );
}
