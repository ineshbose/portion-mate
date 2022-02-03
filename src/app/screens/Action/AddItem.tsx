import * as React from 'react';
import {
  Button,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  TopNavigation,
} from '@ui-kitten/components';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { FAB } from '../../components/FAB';
import { NavProps, RootActionParamList } from '../../types/navigation';
import { createTrackItem } from '../../api/items';
import { useAppContext } from '../../contexts/AppContext';
import { FormError, FrequencyDisplay } from '../../types/api';

const FREQUENCY_OPTIONS: { [f in FrequencyDisplay]: number } = {
  DAILY: 1,
  WEEKLY: 7,
  MONTHLY: 30,
};

export default function AddItem({
  navigation,
}: NavProps<RootActionParamList, 'Item'>) {
  const {
    items = [],
    helpers: { setItems },
  } = useAppContext();
  const [name, setName] = React.useState<string>('');
  const [target, setTarget] = React.useState<number>(1);
  const [selectedFrequency, setSelectedFrequency] = React.useState<IndexPath>(
    new IndexPath(0)
  );
  const [error, setError] = React.useState<FormError | any>();
  const frequencies = Object.keys(FREQUENCY_OPTIONS) as FrequencyDisplay[];

  const strToNum = (val: string) =>
    parseInt(val.match(/\d+/g)?.join('') || '0');

  const goBack = () => navigation.goBack();

  const renderCancelAccessory = (props: {} | undefined) => (
    <Button appearance="ghost" status="basic" {...props} onPress={goBack}>
      Cancel
    </Button>
  );

  const createItem = async () => {
    const newItem = await createTrackItem({
      item: { name },
      target,
      frequency: FREQUENCY_OPTIONS[frequencies[selectedFrequency.row]],
    });
    setItems([...items, newItem]);
    goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment="start"
          title="New Item"
          accessoryRight={renderCancelAccessory}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              maxWidth: 500,
              marginTop: 100,
            }}
          >
            <Input
              placeholder="Enter name"
              onChangeText={setName}
              style={{ margin: 2 }}
              caption={error?.name}
              status={error?.name ? 'danger' : 'basic'}
              size="large"
            />
            <View style={{ flexDirection: 'row' }}>
              <Input
                placeholder="target"
                value={`${target}`}
                onChangeText={(t) => setTarget(strToNum(t))}
                style={{ flex: 1, margin: 2 }}
                size="large"
              />
              <Select
                value={frequencies[selectedFrequency.row].toLowerCase()}
                selectedIndex={selectedFrequency}
                onSelect={(index) => setSelectedFrequency(index as IndexPath)}
                style={{ flex: 1, margin: 2 }}
                size="large"
                disabled
              >
                {frequencies.map((frequency) => (
                  <SelectItem key={frequency} title={frequency} />
                ))}
              </Select>
            </View>
          </View>
        </View>
      </Layout>
      <FAB
        floatingIcon="check"
        color="green"
        onPressMain={() =>
          name ? createItem() : setError({ name: 'This field is required.' })
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
