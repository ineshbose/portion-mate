import React from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';

const formStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formElement: {
    marginVertical: 2,
  },
  themeToggleStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  viewPassword: {
    minHeight: 0,
    minWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  loginButton: {
    marginTop: 10,
  },
  agreedSpacing: {
    marginVertical: 10,
  },
});

const pwAccessoryIcon = (
  value: boolean,
  p: Partial<ImageProps> | undefined
) => <Icon name={value ? 'visibility-off' : 'visibility'} {...p} />;

export const passwordAccessory = (
  props: Partial<ImageProps> | undefined,
  setter: Function,
  value: boolean
) => (
  <Button
    appearance="ghost"
    onPress={() => setter(!value)}
    accessoryLeft={(p) => pwAccessoryIcon(value, p)}
    {...props}
    style={formStyle.viewPassword}
  />
);

export default formStyle;
