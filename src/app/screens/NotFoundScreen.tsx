import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { useThemeContext } from '../contexts/ThemeContext';
import { RootStackScreenProps } from '../types/navigation';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  const { ThemeToggle } = useThemeContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.title}>{"This screen doesn't exist."}</Text>
        <TouchableOpacity
          onPress={() => navigation.replace('Root')}
          style={styles.link}
        >
          <Text style={styles.linkText}>Go to home screen!</Text>
        </TouchableOpacity>
      </Layout>
      <ThemeToggle style={styles.toggle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  toggle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
