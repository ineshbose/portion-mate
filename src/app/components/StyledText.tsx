import { Text, TextProps } from '@ui-kitten/components';
import * as React from 'react';

export default function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}
