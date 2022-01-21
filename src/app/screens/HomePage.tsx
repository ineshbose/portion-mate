import * as React from 'react';
import { NativeScrollEvent, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { ColorScheme } from '../types';
import { ComponentTabArguments } from '../types/navigation';
import Colors from '../constants/Colors';
import { IconButtonGroup } from '../components/IconButtonGroup';
import { deleteTrackItem, getTrackItems, updateTrackItem } from '../api/items';
import { PortionItem, TrackItems, UserLog, UserLogs } from '../types/api';
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

export default function HomePage(props: ComponentTabArguments<'Home'>) {
  const { isAction, colorScheme } = props;
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
  }, []);

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
      {(items as TrackItems).map((item, index) => (
        <ListItem
          key={item.id}
          bottomDivider
          containerStyle={{
            backgroundColor: Colors[colorScheme as ColorScheme].background,
          }}
        >
          <ListItem.Content>
            {item.item && (
              <ListItem.Title
                style={{ color: Colors[colorScheme as ColorScheme].text }}
              >
                {(item.item as PortionItem).name}
              </ListItem.Title>
            )}
            <Text>
              {isAction ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {item.target}
                  <IconButtonGroup
                    buttons={[
                      <MaterialIcons key="add" name="add" />,
                      <MaterialIcons key="remove" name="remove" />,
                    ]}
                    disabled={item.target > 0 ? [] : [1]}
                    onPress={(value) => updateItemSettings(true, value, index)}
                  />
                </Text>
              ) : (
                Array.from(Array(item.target), (e, i) => (
                  <ListItem.CheckBox
                    checkedIcon="times"
                    key={i}
                    checked={i < (item.logs as UserLogs).length}
                  />
                ))
              )}
            </Text>
          </ListItem.Content>
          <ListItem.Content right>
            {isAction ? (
              <IconButtonGroup
                buttons={[
                  <MaterialIcons key="delete" name="delete" />,
                  <MaterialIcons key="reorder" name="reorder" />,
                ]}
                disabled={[1]}
                onPress={(value) => updateItemSettings(false, value, index)}
              />
            ) : (
              <View>
                <ListItem.Subtitle
                  style={{ color: Colors[colorScheme as ColorScheme].tint }}
                >
                  {item.target}/{getFrequencyDisplay(item.frequency)}
                </ListItem.Subtitle>
                <IconButtonGroup
                  buttons={[
                    <MaterialIcons key="remove" name="remove" />,
                    <MaterialIcons key="add" name="add" />,
                  ]}
                  disabled={(item.logs as UserLogs).length > 0 ? [] : [0]}
                  onPress={(value) => updateItemLogs(value, index)}
                />
              </View>
            )}
          </ListItem.Content>
        </ListItem>
      ))}
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
