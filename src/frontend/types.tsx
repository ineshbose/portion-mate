/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ColorScheme = NonNullable<ColorSchemeName>;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootLinkParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootLinkParamList = {
  BottomTab: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<RootAuthParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stats: undefined;
  Resources: undefined;
};

export type RootAuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootAuthScreenProps<Screen extends keyof RootAuthParamList> =
  NativeStackScreenProps<RootAuthParamList, Screen>;

export type RouteActionIcon = {
  [route in keyof RootTabParamList]: React.ComponentProps<
    typeof MaterialIcons
  >['name'];
};

export type TabExtraArguments = {
  isAction?: boolean;
  colorScheme?: ColorScheme;
};

export type ComponentTabArguments = TabExtraArguments &
  RootTabScreenProps<'Home'>;

export type ComponentTab = (args: ComponentTabArguments) => JSX.Element;

export type TabConfig = {
  name: keyof RootTabParamList;
  component: ComponentTab;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};
