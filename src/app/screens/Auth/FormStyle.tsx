import React from 'react';
import { ImageProps } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthParamList, RootStackParamList } from '../../types/navigation';
import createStyle from '../../constants/Styles';

const formStyle = createStyle({
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
  agreedTextSpacing: {
    marginHorizontal: 4,
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

export const SwitchForm = ({
  navigation,
  page,
}: {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<RootAuthParamList, 'Login'>,
    NativeStackNavigationProp<RootStackParamList, 'Root'>
  >;
  page: keyof RootAuthParamList;
}) => (
  <Button
    onPress={() => navigation.navigate(page)}
    status="warning"
    style={formStyle.formElement}
  >
    {page === 'Register' ? 'create account' : 'log into existing account'}
  </Button>
);

export default formStyle;
