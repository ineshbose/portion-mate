import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import { RootStackParamList } from '../types/navigation';
import RootNavigator from './RootNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
