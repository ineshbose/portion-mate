import React from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  TextProps,
  ViewProps,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  CheckBox,
  Layout,
  List,
  ListItem,
  Icon,
  Text,
} from '@ui-kitten/components';
import { useAppContext } from '../../contexts';
import {
  deleteTrackItem,
  getTrackItems,
  updateTrackItem,
} from '../../api/items';
import { createUserLog, deleteUserLog } from '../../api/logs';
import {
  PortionItem,
  TrackItem,
  TrackItems,
  UserLog,
  UserLogs,
} from '../../types/api';
import { IconOptions } from '../../types';

const frequencyDisplay: { [frequency: number]: string } = {
  1: 'd',
  7: 'w',
  30: 'm',
  365: 'y',
};

const getFrequencyDisplay = (frequency: number) => {
  return (
    frequencyDisplay[frequency] ||
    (frequency % 365 === 0
      ? `${frequency / 365}${frequencyDisplay[365]}`
      : frequency % 30 === 0
      ? `${frequency / 30}${frequencyDisplay[30]}`
      : frequency % 7 === 0
      ? `${frequency / 7}${frequencyDisplay[7]}`
      : `${frequency}d`)
  );
};

export default function HomePage() {
  const {
    items,
    headerAction,
    helpers: { setItems },
  } = useAppContext();

  const isAction = headerAction === 'Home';

  React.useEffect(() => {
    const getItems = async () => {
      if (!(items && items.length > 0)) {
        setItems((await getTrackItems()) as TrackItems);
      }
    };

    getItems();
  }, [items, setItems]);

  const updateItemLogs = async (action: 'add' | 'remove', item: TrackItem) => {
    const itemIdx = (items as TrackItems).indexOf(item);
    const newItem = { ...item };
    const newItems = [...(items as TrackItems)];

    if (action === 'add') {
      const log = (await createUserLog({
        item: 'id' in item ? item.id : item,
      })) as UserLog;
      newItem.logs?.push(log);
    } else {
      const log = item.logs?.pop();
      if (log) {
        await deleteUserLog(log);
        newItem.logs = newItem.logs?.filter((l) => l.id !== log.id);
      }
    }

    newItems[itemIdx] = newItem;
    setItems(newItems);
  };

  const updateItemSettings = async (
    updateTarget: boolean,
    action: 'add' | 'remove',
    item: TrackItem
  ) => {
    const itemIdx = (items as TrackItems).indexOf(item);
    const newItem = { ...item };
    const newItems = [...(items as TrackItems)];

    if (updateTarget) {
      const { target } = item;
      const newTarget = action === 'add' ? target + 1 : target - 1;

      await updateTrackItem({ ...newItem, target: newTarget });
      newItem.target = newTarget;
    } else {
      if (action === 'remove') {
        await deleteTrackItem(item);
        return setItems(newItems.filter((i) => i.id !== item.id));
      } else {
        // reordered
      }
    }

    newItems[itemIdx] = newItem;
    setItems(newItems);
  };

  const actionIcon = (
    props: Partial<ImageProps> | undefined,
    action: IconOptions
  ) => <Icon key={action} name={action} {...props} />;

  const itemCheckBox = (item: TrackItem, idx: number) => (
    <CheckBox
      style={styles.checkbox}
      key={idx}
      checked={idx < (item.logs as UserLogs).length}
      onChange={(checked) => updateItemLogs(checked ? 'add' : 'remove', item)}
    />
  );

  const itemCheckBoxes = (item: TrackItem) =>
    Array.from(
      Array(
        item.logs && item.logs.length > 0
          ? Math.max(item.target, item.logs.length)
          : item.target
      ),
      (_e, i) => itemCheckBox(item, i)
    );

  const renderItemDescription = (
    props: TextProps | undefined,
    item: TrackItem
  ) =>
    isAction ? (
      <Text
        {...props}
        style={[
          // eslint-disable-next-line react/prop-types
          props?.style,
          {
            fontSize: 18,
            fontWeight: 'bold',
          },
        ]}
      >
        {item.target}
        <ButtonGroup appearance="ghost">
          <Button
            accessoryLeft={(p) => actionIcon(p, 'add')}
            onPress={() => updateItemSettings(true, 'add', item)}
          />
          <Button
            accessoryLeft={(p) => actionIcon(p, 'remove')}
            disabled={item.target < 1}
            onPress={() => updateItemSettings(true, 'remove', item)}
          />
        </ButtonGroup>
      </Text>
    ) : (
      <Layout
        {...props}
        // eslint-disable-next-line react/prop-types
        style={[props?.style, { flexDirection: 'row', flexWrap: 'wrap' }]}
      >
        {itemCheckBoxes(item)}
      </Layout>
    );

  const renderItemAccessory = (props: ViewProps | undefined, item: TrackItem) =>
    isAction ? (
      <ButtonGroup appearance="ghost">
        <Button
          accessoryLeft={(p) => actionIcon(p, 'delete')}
          onPress={() => updateItemSettings(false, 'remove', item)}
        />
        <Button
          accessoryLeft={(p) => actionIcon(p, 'reorder')}
          disabled
          onPress={() => updateItemSettings(false, 'add', item)}
        />
      </ButtonGroup>
    ) : (
      <>
        <Text>
          {item.target}/{getFrequencyDisplay(item.frequency)}
        </Text>
        <ButtonGroup appearance="ghost">
          <Button
            accessoryLeft={(p) => actionIcon(p, 'remove')}
            disabled={(item.logs as UserLogs).length < 1}
            onPress={() => updateItemLogs('remove', item)}
          />
          <Button
            accessoryLeft={(p) => actionIcon(p, 'add')}
            onPress={() => updateItemLogs('add', item)}
          />
        </ButtonGroup>
      </>
    );

  const renderItem = (info: ListRenderItemInfo<TrackItem>) => (
    <ListItem
      title={(info.item.item as PortionItem).name}
      description={(props) => renderItemDescription(props, info.item)}
      accessoryRight={(props) => renderItemAccessory(props, info.item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <List data={items} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    marginRight: 2,
  },
});
