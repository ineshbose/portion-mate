import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootLinkParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth } from '../contexts/Auth';

const Root = createNativeStackNavigator<RootLinkParamList>();

export default function RootNavigator() {
  const { authToken, loading } = useAuth();

  return loading ? (
    <></>
  ) : (
    <Root.Navigator>
      {authToken?.access_token ? (
        <Root.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Root.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Root.Navigator>
  );
}
