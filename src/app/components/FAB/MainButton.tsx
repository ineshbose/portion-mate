import * as React from 'react';
import {
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  Keyboard,
  Pressable,
  View,
} from 'react-native';

import ActionItem from './ActionItem';

import { MainButtonProps } from '../../types/FAB';
import DeviceLayout from '../../constants/Layout';

const DEVICE_WIDTH = DeviceLayout.window.width;

const DEFAULT_SHADOW_PROPS = {
  shadowOpacity: 0.35,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowRadius: 3,
};

function MainButton(Props: MainButtonProps) {
  const {
    distanceToEdge,
    mainVerticalDistance,
    actionsPaddingTopBottom,
    visible,
    buttonSize,
    animated,
    showBackground,
    overlayColor,
    actions,
    position,
    floatingIcon,
    dismissKeyboardOnPress,
    onPressMain,
    onPressAction,
    color,
    shadow,
    iconWidth,
    iconHeight,
    iconColor,
  } = Props;

  const [active, setActive] = React.useState<boolean>(false);

  const distanceToVerticalEdge =
    typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.vertical;
  const distanceToHorizontalEdge =
    typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.horizontal;

  const sizeStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
  };
  const shadowOptions = {
    ...DEFAULT_SHADOW_PROPS,
    ...shadow,
  };

  const animation = React.useRef(new Animated.Value(0)).current;
  const actionsAnimation = React.useRef(new Animated.Value(0)).current;

  const visibleAnimation = React.useRef(
    new Animated.Value(visible ? 0 : 1)
  ).current;
  const fadeAnimation = React.useRef(
    new Animated.Value(visible ? 1 : 0)
  ).current;

  const mainBottomAnimation = React.useRef(
    new Animated.Value(distanceToVerticalEdge + mainVerticalDistance)
  ).current;
  const actionsBottomAnimation = React.useRef(
    new Animated.Value(
      buttonSize +
        distanceToVerticalEdge +
        actionsPaddingTopBottom +
        mainVerticalDistance
    )
  ).current;

  const resetButton = () => {
    if (animated) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(actionsAnimation, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
    setActive(false);
  };

  const animateButton = () => {
    if (dismissKeyboardOnPress) {
      Keyboard.dismiss();
    }

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active) {
      if (!floatingIcon && animated) {
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      }

      if (animated) {
        Animated.spring(actionsAnimation, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
        LayoutAnimation.configureNext({
          duration: 180,
          create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
        });
      }

      setActive(true);
    } else {
      resetButton();
    }
  };

  const pressAction = (name?: string) => {
    if (onPressAction && name) {
      onPressAction(name);
    }

    resetButton();
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.overlay, { backgroundColor: 'transparent' }]}
    >
      {active && showBackground && (
        <Pressable
          style={[styles.overlay, { backgroundColor: overlayColor }]}
          onPress={resetButton}
        />
      )}
      {actions && actions.length > 0 && (
        <Animated.View
          style={[
            styles.actions,
            styles[`${position}Actions`],
            animated
              ? {
                  opacity: actionsAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                }
              : { opacity: active ? 1 : 0 },
            {
              bottom: actionsBottomAnimation,
            },
            active ? styles[`${position}ActionsVisible`] : {},
          ]}
          pointerEvents="box-none"
        >
          {actions
            .sort((a, b) => a.position - b.position)
            .map((action) => (
              <ActionItem
                paddingTopBottom={actionsPaddingTopBottom}
                distanceToEdge={distanceToEdge}
                key={action.name}
                textColor={action.textColor}
                textBackground={action.textBackground}
                shadow={shadowOptions}
                {...action}
                position={position}
                active={active}
                onPress={pressAction}
                animated={animated}
              />
            ))}
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.buttonContainer,
          sizeStyle,
          styles[`${position}Button`],
          {
            backgroundColor: color,
            bottom: mainBottomAnimation,
            right: distanceToHorizontalEdge,
          },
          animated
            ? {
                opacity: fadeAnimation,
                transform: [
                  {
                    rotate: visibleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '90deg'],
                    }),
                  },
                  {
                    scale: visibleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  },
                ],
              }
            : {},
          shadowOptions,
        ]}
        accessible
        accessibilityLabel="Floating Action Button"
      >
        <Pressable style={[styles.button, sizeStyle]} onPress={animateButton}>
          <Animated.View
            style={[
              styles.buttonTextContainer,
              sizeStyle,
              {
                transform: [
                  {
                    rotate: active ? '45deg' : '0deg',
                  },
                ],
              },
              animated
                ? {
                    transform: [
                      {
                        rotate: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '45deg'],
                        }),
                      },
                    ],
                  }
                : {
                    transform: [
                      {
                        rotate: active ? '45deg' : '0deg',
                      },
                    ],
                  },
            ]}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={[
                  {
                    width: 2,
                    position: 'absolute',
                  },
                  { height: iconHeight, backgroundColor: iconColor },
                ]}
              />
              <View
                style={[
                  {
                    height: 2,
                    position: 'absolute',
                  },
                  { width: iconWidth, backgroundColor: iconColor },
                ]}
              />
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

MainButton.defaultProps = {
  dismissKeyboardOnPress: false,
  listenKeyboard: false,
  actionsPaddingTopBottom: 8,
  overrideWithAction: false,
  visible: true,
  color: '#1253bc',
  overlayColor: 'rgba(68, 68, 68, 0.6)',
  position: 'right',
  distanceToEdge: 30,
  openOnMount: false,
  showBackground: true,
  buttonSize: 56,
  iconHeight: 15,
  iconWidth: 15,
  iconColor: '#fff',
  mainVerticalDistance: 0,
  animated: true,
  shadow: DEFAULT_SHADOW_PROPS,
};

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    zIndex: 10,
  },
  rightActions: {
    alignItems: 'flex-end',
    right: -1000,
  },
  leftActions: {
    alignItems: 'flex-start',
    left: -1000,
  },
  centerActions: {
    left: -1000,
  },
  rightActionsVisible: {
    right: 0,
  },
  leftActionsVisible: {
    left: 0,
  },
  centerActionsVisible: {
    left: DEVICE_WIDTH / 2 - 30,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 0,
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
  },
  button: {
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {},
  leftButton: {},
  centerButton: {
    left: DEVICE_WIDTH / 2 - 28,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainButton;
