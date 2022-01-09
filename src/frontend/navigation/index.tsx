/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { AuthProvider } from '../contexts/Auth';

import LinkingConfiguration from './LinkingConfiguration';
import StackNavigator from './StackNavigator';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <AuthProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
