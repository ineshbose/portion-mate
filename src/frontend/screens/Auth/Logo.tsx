import * as React from 'react';
import { Card } from 'react-native-elements';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function Logo() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Card.Image
        source={{
          uri: 'https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png',
        }}
      />
      <Card.Title style={{ color: Colors[colorScheme].text }}>
        Portion Mate
      </Card.Title>
    </>
  );
}
