/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IconOptions } from '../types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteNames<T extends ParamListBase> = keyof T & string;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootLinkParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type NavProps<
  List extends ParamListBase,
  Route extends RouteNames<List> = string
> = CompositeScreenProps<
  NativeStackScreenProps<List, Route>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootLinkParamList = {
  BottomTab: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<RootAuthParamList> | undefined;
  Loading: undefined;
};

export type RootStackScreenProps<
  Screen extends RouteNames<RootStackParamList>
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootLinkScreenProps<Screen extends RouteNames<RootLinkParamList>> =
  NativeStackScreenProps<RootLinkParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stats: undefined;
  Resources: undefined;
  Settings: undefined;
  Action: NavigatorScreenParams<RootActionParamList> | undefined;
};

export type RootAuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootActionParamList = {
  Item: undefined;
  Journal: undefined;
};

export type RootTabScreenProps<Screen extends RouteNames<RootTabParamList>> =
  | CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList, Screen>,
      NativeStackScreenProps<RootStackParamList>
    >
  | {
      route: RouteProp<RootTabParamList, RouteNames<RootTabParamList>>;
      navigation: NavigationProp<RootTabParamList>;
    };

export type RootAuthScreenProps<Screen extends RouteNames<RootAuthParamList>> =
  NavProps<RootAuthParamList, Screen>;

export type ScreenPropsC<
  T extends ParamListBase,
  Screen extends RouteNames<T> = RouteNames<T>
> = NavProps<T, Screen>;

export type RouteActionIcon<List extends ParamListBase> = {
  [route in RouteNames<List> | string]: IconOptions;
};

export type TabExtraArguments = {
  [name: string]: any;
};

export type ComponentTabArguments<Screen extends RouteNames<RootTabParamList>> =
  TabExtraArguments & RootTabScreenProps<Screen>;

export type ComponentTab<Screen extends RouteNames<RootTabParamList>> = (
  args: ComponentTabArguments<Screen>
) => JSX.Element;

export type TabConfig<
  List extends RootTabParamList,
  Name extends keyof List = keyof List
> = Name extends RouteNames<RootTabParamList> // List
  ? {
      name: Name;
      component: ComponentTab<Name>;
      // | NamedExoticComponent<ComponentTabArguments<Name>>;
      icon?: IconOptions;
      hideTab?: boolean;
    }
  : never;
