/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  NativeScrollEvent,
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
} from '@ui-kitten/components';
import { Text, View } from '../components/Themed';
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

  const updateItemLogs = async (btnIdx: number, itemIdx: number) => {
    const item = (items as TrackItems)[itemIdx];
    const newItem = { ...item };
    const newItems = [...(items as TrackItems)];

    if (btnIdx > 0) {
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
    isTarget: boolean,
    btnIdx: number,
    itemIdx: number
  ) => {
    const item = (items as TrackItems)[itemIdx];
    const newItem = { ...item };
    const newItems = [...(items as TrackItems)];

    if (isTarget) {
      const { target } = item;
      const newTarget = btnIdx > 0 ? target - 1 : target + 1;

      await updateTrackItem({ ...newItem, target: newTarget });
      newItem.target = newTarget;
    } else {
      if (btnIdx > 0) {
        // reordered
      } else {
        await deleteTrackItem(item);
        return setItems(newItems.filter((i) => i.id !== item.id));
      }
    }

    newItems[itemIdx] = newItem;
    setItems(newItems);
  };

  const renderItemDescription = (
    props: TextProps | undefined,
    item: TrackItem
  ) =>
    isAction ? (
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        {item.target}
        <ButtonGroup>
          <Button
            accessoryLeft={<Icon key="add" name="add" />}
            onPress={() => updateItemSettings(true, 0, 0)}
          />
          <Button
            accessoryLeft={<Icon key="remove" name="remove" />}
            disabled={item.target < 1}
            onPress={() => updateItemSettings(true, 1, 0)}
          />
        </ButtonGroup>
      </Text>
    ) : (
      <Layout style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from(Array(item.target), (e, i) => (
          <CheckBox key={i} checked={i < (item.logs as UserLogs).length} />
        ))}
      </Layout>
    );

  const renderItemAccessory = (props: ViewProps | undefined, item: TrackItem) =>
    isAction ? (
      <ButtonGroup>
        <Button
          accessoryLeft={<Icon key="delete" name="delete" />}
          onPress={() => updateItemSettings(false, 0, 0)}
        />
        <Button
          accessoryLeft={<Icon key="reorder" name="reorder" />}
          disabled
          onPress={() => updateItemSettings(false, 1, 0)}
        />
      </ButtonGroup>
    ) : (
      <View>
        <ButtonGroup>
          <Button
            accessoryLeft={<Icon key="remove" name="remove" />}
            disabled={(item.logs as UserLogs).length < 1}
            onPress={() => updateItemLogs(0, 0)}
          />
          <Button
            accessoryLeft={<Icon key="add" name="add" />}
            onPress={() => updateItemLogs(1, 0)}
          />
        </ButtonGroup>
      </View>
    );

  const renderItem = ({ item, index }: { item: TrackItem; index: number }) => (
    <ListItem
      title={(item.item as PortionItem).name}
      description={(props) => renderItemDescription(props, item)}
      accessoryRight={(props) => renderItemAccessory(props, item)}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      onScroll={(e) => {
        if (isCloseToBottom(e.nativeEvent)) {
          // paginate
        }
      }}
      scrollEventThrottle={400}
    >
      <List data={items} renderItem={renderItem} />
    </ScrollView>
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
