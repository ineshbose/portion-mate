import { MaterialIcons } from '@expo/vector-icons';
import { ColorSchemeName } from 'react-native';

export type ColorScheme = NonNullable<ColorSchemeName>;

export type MaterialIconsOptions = React.ComponentProps<
  typeof MaterialIcons
>['name'];
