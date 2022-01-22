import { MaterialIcons } from '@expo/vector-icons';
import { ColorSchemeName } from 'react-native';

export type ColorScheme = NonNullable<ColorSchemeName>;

export type IconOptions = React.ComponentProps<typeof MaterialIcons>['name'];

export type ChildComponents = {
  children: (JSX.Element | undefined) | (JSX.Element | undefined)[];
};
