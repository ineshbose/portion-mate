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
  color: string;
  icon: any;
  position: number;
  name: string;
  buttonSize: number;
  text: string;
  textBackground?: string;
  textColor?: string;
  component: any;
  animated: boolean;
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
  overrideWithAction: boolean; // replace mainAction with first action from actions
  floatingIcon: any;
  showBackground: boolean;
  openOnMount: boolean;
  actionsPaddingTopBottom: number;
  buttonSize: number;
  iconHeight: number;
  iconWidth: number;
  iconColor: string;
  listenKeyboard: boolean;
  dismissKeyboardOnPress: boolean;
  shadow: Shadow;
  onPressAction: (itemName: string) => void;
  onPressMain: (isActive: boolean) => void;
  onClose: () => void;
  onOpen: () => void;
  onPressBackdrop: () => void;
  onStateChange: (stateChange: { isActive: boolean }) => void;
};

export type ActionItemProps = {
  tintColor: string;
  color: string;
  icon: any;
  name: string; //.isRequired
  buttonSize?: number;
  textContainerStyle: any;
  text: string;
  textStyle: any;
  textProps: any;
  textBackground?: string;
  textColor: string;
  shadow: Shadow;
  // not on doc
  textElevation: number;
  // not modified by user
  position: 'left' | 'right' | 'center';
  active: boolean;
  distanceToEdge:
    | number
    | {
        vertical: number;
        horizontal: number;
      };
  paddingTopBottom: number; // modified by parent property "actionsPaddingTopBottom"
  margin: number;
  animated: boolean;
  onPress: (name?: string) => void;
  render: () => void;
};
