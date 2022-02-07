import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function Logo() {
  return (
    <>
      <Image
        source={{
          uri: 'https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png',
        }}
        style={styles.appLogo}
      />
      <Text>Portion Mate</Text>
    </>
  );
}

const styles = StyleSheet.create({
  appLogo: {
    height: 200,
    width: 200,
  },
});
