import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootLinkParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';

const Root = createNativeStackNavigator<RootLinkParamList>();

export default function RootNavigator() {
  return (
    <Root.Navigator>
      <Root.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
}
