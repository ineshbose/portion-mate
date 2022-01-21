import * as React from 'react';
import { Image, Text } from 'react-native';

export default function Logo() {
  return (
    <>
      <Image
        source={{
          uri: 'https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png',
        }}
      />
      <Text>Portion Mate</Text>
    </>
  );
}
