import React from 'react';
import { Text, TextProps } from '@ui-kitten/components';

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}
