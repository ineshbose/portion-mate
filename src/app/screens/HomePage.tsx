/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  NativeScrollEvent,
  SafeAreaView,
  ScrollView,
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
import { ComponentTabArguments } from '../types/navigation';
import { deleteTrackItem, getTrackItems, updateTrackItem } from '../api/items';
import {
  PortionItem,
  TrackItem,
  TrackItems,
  UserLog,
  UserLogs,
} from '../types/api';
import { useAppContext } from '../contexts/AppContext';
import { createUserLog, deleteUserLog } from '../api/logs';
import { IconOptions } from '../types';

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

const isCloseToBottom = (props: NativeScrollEvent) => {
  const paddingToBottom = 20;
  const { layoutMeasurement, contentOffset, contentSize } = props;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function HomePage(pageProps: ComponentTabArguments<'Home'>) {
  const { isAction } = pageProps;
  const {
    items,
    helpers: { setItems },
  } = useAppContext();

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

  const actionIcon = (props: any, action: IconOptions) => (
    <Icon key={action} name={action} {...props} />
  );

  const itemCheckBox = (item: TrackItem, idx: number) => (
    <CheckBox
      key={idx}
      checked={idx < (item.logs as UserLogs).length}
      onChange={(checked) => updateItemLogs(checked ? 'add' : 'remove', item)}
    />
  );

  const itemCheckBoxes = (item: TrackItem) =>
    Array.from(Array(item.target), (_e, i) => itemCheckBox(item, i));

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
      <ButtonGroup appearance="ghost" {...props}>
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
        <Text {...props}>
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

  const renderItem = ({ item }: { item: TrackItem }) => (
    <ListItem
      title={(item.item as PortionItem).name}
      description={(props) => renderItemDescription(props, item)}
      accessoryRight={(props) => renderItemAccessory(props, item)}
    />
  );

  return (
    <SafeAreaView>
      <List data={items} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
