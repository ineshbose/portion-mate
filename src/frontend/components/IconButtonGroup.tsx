import * as React from 'react';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';

export function IconButtonGroup(props: ButtonGroupProps) {
  const { containerStyle, buttonContainerStyle, ...otherProps } = props;
  return (
    <ButtonGroup
      {...otherProps}
      containerStyle={[
        {
          backgroundColor: 'rgb(0, 0, 0, 0)',
          borderWidth: 0,
        },
        containerStyle,
      ]}
      buttonContainerStyle={[
        {
          borderRightWidth: 0,
          borderLeftWidth: 0,
        },
        buttonContainerStyle,
      ]}
    />
  );
}
