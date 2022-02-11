import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useAppContext } from '../contexts';
import { RootLinkParamList } from '../types/navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';

const Root = createNativeStackNavigator<RootLinkParamList>();

function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={[styles.container, styles.messageContainer]}>
        <Spinner size="giant" />
        <Text style={styles.title}>{'Loading...'}</Text>
      </Layout>
    </SafeAreaView>
  );
}

export default function RootNavigator() {
  const { authToken, loading } = useAppContext();

  return (
    <Root.Navigator>
      {loading ? (
        <Root.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      ) : authToken?.access_token ? (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
