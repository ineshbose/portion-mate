import * as React from 'react';
import { Image, Text } from 'react-native';

export default function Logo() {
  return (
    <>
      <Image
        source={{
          uri: 'https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png',
        }}
        style={{
          height: 200,
          width: 200,
        }}
      />
      <Text>Portion Mate</Text>
    </>
  );
}
