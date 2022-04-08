import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useAppContext } from '../contexts';
import { RootLinkParamList } from '../types/navigation';
import createStyle from '../constants/Styles';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';

const Root = createNativeStackNavigator<RootLinkParamList>();

function LoadingScreen() {
  return (
    <SafeAreaView style={styles.flex1}>
      <Layout
        style={[
          styles.flex1,
          styles.alignItemsCenter,
          styles.justifyContentCenter,
          styles.padding2,
        ]}
      >
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

const styles = createStyle({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
