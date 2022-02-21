import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Input, Layout } from '@ui-kitten/components';
import { AuthError } from '../../types/api';
import { useThemeContext } from '../../contexts';
import styles from './FormStyle';
import Logo from './Logo';

type FormProps = {
  children: (Input | JSX.Element | undefined)[];
  error?: AuthError;
};

export default function AuthForm(formProps: FormProps) {
  const { children, error } = formProps;
  const { ThemeToggle } = useThemeContext();

  return (
    <>
      <KeyboardAvoidingView style={styles.flex1}>
        <Layout style={[styles.flex1, styles.paddingHorizontal1]}>
          <View
            style={[
              styles.alignItemsCenter,
              styles.justifyContentCenter,
              styles.padding2,
            ]}
          >
            <Logo />
          </View>
          <View style={[styles.flex1, styles.paddingHorizontal1]}>
            {error && (
              <Button
                status="danger"
                appearance="outline"
                style={styles.marginVertical1}
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
