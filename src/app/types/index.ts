import { ReactNode } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ColorSchemeName } from 'react-native';

export type ColorScheme = NonNullable<ColorSchemeName>;

export type IconOptions = React.ComponentProps<typeof MaterialIcons>['name'];

export type ChildComponents = {
  children?: ReactNode | JSX.Element | (JSX.Element | undefined)[];
};
