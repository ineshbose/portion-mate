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
import { ContextProvider } from '../contexts/AppContext';

import LinkingConfiguration from './LinkingConfiguration';
import StackNavigator from './StackNavigator';

type NavProps = {
  colorScheme: ColorSchemeName;
};

export default function Navigation(props: NavProps) {
  const { colorScheme } = props;

  return (
    <ContextProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}
