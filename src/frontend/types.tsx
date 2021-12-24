/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stats: undefined;
  Resources: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ModelID = number | string;

export type User = {
  id: ModelID;
  email: string;
  first_name: string | null;
  last_name: string | null;
  picture: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  items?: TrackItem[];
};

export type PortionItem = {
  id: ModelID;
  name: string;
  is_default: boolean;
};

export type TrackItem = {
  id: ModelID;
  item?: PortionItem | ModelID;
  user?: User | ModelID;
  target: number;
  order: number | undefined;
  frequency: number;
  logs?: UserLog[];
};

export type UserLog = {
  id: ModelID;
  item?: TrackItem | ModelID;
  timestamp: string | Date;
};
