import { TextProps, TextStyle, ViewStyle } from 'react-native';
import { IconOptions } from '.';
import { RootActionParamList } from './navigation';

export type Actions = keyof RootActionParamList;

export type Shadow = {
  shadowOpacity: number;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowColor: string;
  shadowRadius: number;
};

export type ActionItem = {
  color?: string;
  icon: IconOptions;
  name: Actions;
  buttonSize?: number;
  text?: string;
  textBackground?: string;
  textColor?: string;
  animated?: boolean;
};

export type MainButtonProps = {
  actions: ActionItem[];
  animated: boolean;
  color: string;
  distanceToEdge:
    | number
    | {
        vertical: number;
        horizontal: number;
      };
  mainVerticalDistance: number;
  visible: boolean;
  overlayColor: string;
  position: 'right' | 'left' | 'center';
  showBackground: boolean;
  actionsPaddingTopBottom: number;
  buttonSize: number;
  floatingIcon?: IconOptions;
  iconHeight: number;
  iconWidth: number;
  iconColor: string;
  shadow?: Shadow;
  onPressAction?: (itemName: Actions) => void;
  onPressMain?: (isActive: boolean) => void;
};

export type ActionItemProps = {
  tintColor: string;
  color: string;
  icon: IconOptions;
  name: Actions;
  buttonSize?: number;
  textContainerStyle?: ViewStyle;
  text?: string;
  textStyle?: TextStyle;
  textProps?: TextProps;
  textBackground?: string;
  textColor?: string;
  shadow: Shadow;
  textElevation: number;
  position: 'left' | 'right' | 'center';
  active: boolean;
  distanceToEdge:
    | number
    | {
        vertical: number;
        horizontal: number;
      };
  paddingTopBottom: number;
  margin: number;
  animated: boolean;
  onPress: (name?: Actions) => void;
};
