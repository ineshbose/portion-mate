/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ContextProvider } from '../contexts/AppContext';

import LinkingConfiguration from './LinkingConfiguration';
import StackNavigator from './StackNavigator';

export default function Navigation() {
  return (
    <ContextProvider>
      <NavigationContainer linking={LinkingConfiguration}>
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}
