import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from '@ui-kitten/components';
import FAB from '../../components/FAB';

export const renderCancelAccessory = (
  props: {} | undefined,
  goBack?: ((event: GestureResponderEvent) => void) | undefined
) => (
  <Button appearance="ghost" status="basic" {...props} onPress={goBack}>
    Cancel
  </Button>
);

export const ActionButton = ({ onPressMain }: { onPressMain: () => any }) => (
  <FAB floatingIcon="check" color="green" onPressMain={onPressMain} />
);
