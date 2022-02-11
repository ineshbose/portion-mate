import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';

import { useThemeContext } from '../contexts';
import EditScreenInfo from '../components/EditScreenInfo';

export default function ModalScreen() {
  const { ThemeToggle } = useThemeContext();

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={[styles.container, styles.centerContainer]}>
        <Text style={styles.title}>Modal</Text>
        <View style={styles.separator} />
        <EditScreenInfo path="/screens/ModalScreen.tsx" />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Layout>
      <ThemeToggle style={styles.toggle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  toggle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
