import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootAuthParamList } from '../types/navigation';
import LoginForm from '../screens/Auth/LoginForm';
import RegisterForm from '../screens/Auth/RegisterForm';

const Auth = createNativeStackNavigator<RootAuthParamList>();

export default function AuthNavigator() {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen
        name="Login"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="Register"
        component={RegisterForm}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
}
