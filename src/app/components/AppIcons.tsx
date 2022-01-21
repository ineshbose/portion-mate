import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleType } from '@ui-kitten/components';
import { IconOptions } from '../types';

export const MaterialIconsPack = {
  name: 'material',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target: any, name: IconOptions) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = (name: IconOptions) => ({
  toReactElement: (props: any) => MaterialIcon({ name, ...props }),
});

type IconProps = {
  name: IconOptions;
  style: StyleType;
};

function MaterialIcon(iconProps: IconProps) {
  const { name, style } = iconProps;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialIcons
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
