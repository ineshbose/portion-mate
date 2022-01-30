import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function AddItem() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}></Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
