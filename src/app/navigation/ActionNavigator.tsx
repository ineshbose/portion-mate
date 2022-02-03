import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AddItem from '../screens/Action/AddItem';
import AddJournal from '../screens/Action/AddJournal';
import { RootActionParamList } from '../types/navigation';

const Action = createNativeStackNavigator<RootActionParamList>();

export default function ActionNavigator() {
  return (
    <Action.Navigator initialRouteName="Item">
      <Action.Screen
        name="Item"
        component={AddItem}
        options={{ headerShown: false }}
      />
      <Action.Screen
        name="Journal"
        component={AddJournal}
        options={{ headerShown: false }}
      />
    </Action.Navigator>
  );
}