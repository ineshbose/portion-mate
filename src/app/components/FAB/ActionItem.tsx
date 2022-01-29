import * as React from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';
import { ActionItemProps } from '../../types/FAB';

function ActionItem(props: ActionItemProps) {
  const {
    paddingTopBottom,
    animated,
    buttonSize,
    color,
    text,
    position,
    textElevation,
    textBackground,
    textColor,
    textStyle,
    textProps,
    textContainerStyle,
    shadow,
    name,
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
        <View
          key="text"
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation,
              shadowOffset: {
                height: textElevation,
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
            {text}
          </Text>
        </View>

        <View
          key="button"
          style={[
            styles.button,
            {
              backgroundColor: color,
              width: buttonSize,
              height: buttonSize,
              borderRadius: (buttonSize || 40) / 2,
            },
            shadow,
          ]}
        >
          <Text>icon</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

ActionItem.defaultProps = {
  tintColor: '#fff',
  color: '#1253bc',
  distanceToEdge: 30,
  buttonSize: 40,
  textElevation: 5,
  textColor: '#444444',
  textBackground: '#ffffff',
  margin: 8,
  shadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#000000',
    shadowRadius: 3,
  },
};

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
  iconLogo: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});

export default ActionItem;
