import * as React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {},
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formElement: {
    marginVertical: 2,
  },
});

export const passwordAccessory = (
  props: any,
  setter: Function,
  value: boolean
) => (
  <Button
    appearance="ghost"
    onPress={() => setter(!value)}
    accessoryLeft={<Icon name={value ? 'visibility-off' : 'visibility'} />}
    {...props}
    style={{
      minHeight: null,
      minWidth: null,
      paddingVertical: 0,
      paddingHorizontal: 0,
    }}
  />
);
