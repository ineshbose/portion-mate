/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ColorScheme = NonNullable<ColorSchemeName>;

export type MaterialIconsOptions = React.ComponentProps<
  typeof MaterialIcons
>['name'];

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootLinkParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type NavProps<
  List extends ParamListBase,
  Route extends string
> = CompositeScreenProps<
  NativeStackScreenProps<List, Route>,
  NativeStackScreenProps<RootStackParamList>
>;

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
  NavProps<RootAuthParamList, Screen>;

export type RouteActionIcon<List> = {
  [route in keyof List]: MaterialIconsOptions;
};

export type TabExtraArguments = {
  isAction?: boolean;
  colorScheme?: ColorScheme;
};

export type ComponentTabArguments<Screen extends keyof RootTabParamList> =
  TabExtraArguments & RootTabScreenProps<Screen>;

export type ComponentTab<Screen extends keyof RootTabParamList> = (
  args: ComponentTabArguments<Screen>
) => JSX.Element;

export type TabConfig<
  List extends RootTabParamList,
  Name extends keyof List = keyof List
> = Name extends keyof RootTabParamList // List
  ? {
      name: Name;
      component: ComponentTab<Name>;
      icon: MaterialIconsOptions;
    }
  : never;
