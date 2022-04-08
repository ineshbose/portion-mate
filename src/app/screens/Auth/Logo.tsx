import React from 'react';
import { Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import createStyle from '../../constants/Styles';

export default function Logo() {
  return (
    <>
      <Image
        source={{
          uri: 'https://portion-mate.readthedocs.io/en/latest/assets/logo.png',
        }}
        // @ts-ignore
        style={styles.appLogo}
      />
      <Text>Portion Mate</Text>
    </>
  );
}

const styles = createStyle({
  appLogo: {
    height: 200,
    width: 200,
  },
});
