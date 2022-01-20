import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootLinkParamList } from '../types/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useAppContext } from '../contexts/AppContext';

const Root = createNativeStackNavigator<RootLinkParamList>();

export default function RootNavigator() {
  const { authToken } = useAppContext();

  return (
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
