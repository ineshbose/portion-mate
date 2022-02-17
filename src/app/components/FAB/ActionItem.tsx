import React from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { ActionItemProps } from '../../types/FAB';

export default function ActionItem(props: ActionItemProps) {
  const {
    name,
    text,
    icon,
    color = 'red',
    shadow = {},
    animated = true,
    buttonSize = 40,
    position = 'right',
    textStyle = {},
    textColor = 'black',
    textProps = {},
    textElevation = 5,
    textBackground = 'white',
    textContainerStyle = {},
    paddingTopBottom = 8,
    onPress,
  } = props;

  const animation = React.useRef(new Animated.Value(0)).current;

  return (
    <Pressable style={styles.container} onPress={() => onPress(name)}>
      <Animated.View
        style={[
          styles.actionContainer,
          animated
            ? {
                marginBottom: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [5, 10],
                }),
              }
            : { marginBottom: 10 },
          {
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
          },
        ]}
      >
        <Layout
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation,
              shadowOffset: {
                height: textElevation,
                width: textElevation,
              },
            },
            shadow,
            textContainerStyle,
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor,
              },
              textStyle,
            ]}
            {...textProps}
          >
            {text || name}
          </Text>
        </Layout>

        <Button
          onPress={() => onPress(name)}
          style={[
            styles.button,
            {
              backgroundColor: color,
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
            shadow,
          ]}
          accessoryLeft={(p) => <Icon name={icon} {...p} />}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column',
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  textContainer: {
    paddingHorizontal: 8,
    elevation: 5,
    borderRadius: 4,
    height: 22,
  },
  leftTextContainer: {
    marginLeft: 14,
  },
  centerTextContainer: {},
  rightTextContainer: {
    marginRight: 14,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
