import React from 'react';
import { Image } from 'react-native';
import { Text } from '@ui-kitten/components';

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
