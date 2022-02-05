import React from 'react';
import {
  StyleSheet,
  Animated,
  LayoutAnimation,
  Keyboard,
  Pressable,
  View,
} from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import ActionItem from './ActionItem';
import { MainButtonProps } from '../../types/FAB';
import { RootActionParamList } from '../../types/navigation';

const DEFAULT_SHADOW_PROPS = {
  shadowOpacity: 0.35,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowRadius: 3,
};

export default function MainButton(Props: MainButtonProps) {
  const {
    color = 'red',
    shadow = {},
    actions = [],
    visible = true,
    position = 'right',
    animated = true,
    iconHeight = 15,
    iconWidth = 15,
    iconColor = '#fff',
    buttonSize = 56,
    floatingIcon,
    overlayColor = 'rgba(68, 68, 68, 0.6)',
    showBackground = 'true',
    distanceToEdge = 30,
    mainVerticalDistance = 0,
    actionsPaddingTopBottom = 8,
    onPressMain,
    onPressAction,
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
    Keyboard.dismiss();

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active && actions.length > 0) {
      if (animated) {
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
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

  const pressAction = (name?: keyof RootActionParamList) => {
    if (onPressAction && name) {
      onPressAction(name);
    }

    resetButton();
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.overlay,
        { backgroundColor: 'transparent', display: visible ? 'flex' : 'none' },
      ]}
    >
      {active && showBackground && (
        <Pressable
          style={[styles.overlay, { backgroundColor: overlayColor }]}
          onPress={resetButton}
        />
      )}
      {active && actions && actions.length > 0 && (
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
          {actions.map((action) => (
            <ActionItem
              paddingTopBottom={actionsPaddingTopBottom}
              distanceToEdge={distanceToEdge}
              key={action.name}
              shadow={shadowOptions}
              tintColor="#fff"
              color={color}
              buttonSize={40}
              textElevation={5}
              margin={8}
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
            backgroundColor: active ? 'white' : color,
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
            {floatingIcon ? (
              <Button
                onPress={animateButton}
                appearance="ghost"
                accessoryLeft={(p) => (
                  <Icon
                    name={floatingIcon}
                    {...p}
                    style={[p?.style, { color: active ? color : iconColor }]}
                  />
                )}
              />
            ) : (
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
                    {
                      height: iconHeight,
                      backgroundColor: active ? color : iconColor,
                    },
                  ]}
                />
                <View
                  style={[
                    {
                      height: 2,
                      position: 'absolute',
                    },
                    {
                      width: iconWidth,
                      backgroundColor: active ? color : iconColor,
                    },
                  ]}
                />
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    zIndex: 10,
  },
  rightActions: {
    alignItems: 'flex-end',
    right: 30,
  },
  leftActions: {
    alignItems: 'flex-start',
    left: 30,
  },
  centerActions: {},
  rightActionsVisible: {
    right: 30,
  },
  leftActionsVisible: {
    left: 30,
  },
  centerActionsVisible: {},
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
    overflow: 'hidden',
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
  centerButton: {},
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
