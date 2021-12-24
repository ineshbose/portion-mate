import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import {
  TrackItem,
  PortionItem,
  UserLog,
  ComponentTabArguments,
  ColorScheme,
} from '../types';
import Colors from '../constants/Colors';
import { IconButtonGroup } from '../components/IconButtonGroup';

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

const list: TrackItem[] = [
  {
    id: 1,
    item: {
      id: 1,
      name: 'Carbohydrates',
      is_default: true,
    },
    target: 6,
    order: 1,
    frequency: 1,
    logs: [
      {
        id: 1,
        timestamp: '2021-12-23T01:02:00Z',
      },
      {
        id: 2,
        timestamp: '2021-12-23T01:02:00Z',
      },
    ],
  },
  {
    id: 2,
    item: {
      id: 2,
      name: 'Fruits & Vegetables',
      is_default: true,
    },
    target: 6,
    order: 2,
    frequency: 1,
    logs: [
      {
        id: 3,
        timestamp: '2021-12-23T01:02:00Z',
      },
    ],
  },
  {
    id: 3,
    item: {
      id: 3,
      name: 'Protein',
      is_default: true,
    },
    target: 3,
    order: 3,
    frequency: 1,
    logs: [],
  },
  {
    id: 4,
    item: {
      id: 4,
      name: 'Dairy',
      is_default: true,
    },
    target: 3,
    order: 4,
    frequency: 1,
    logs: [],
  },
  {
    id: 5,
    item: {
      id: 5,
      name: 'Oils & Fats',
      is_default: true,
    },
    target: 1,
    order: 5,
    frequency: 1,
    logs: [],
  },
];

export default function HomePage({
  isAction,
  colorScheme,
}: ComponentTabArguments) {
  return (
    <View style={styles.container}>
      {list.map((item) => (
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
                  />
                </Text>
              ) : (
                Array.from(Array(item.target), (e, i) => (
                  <ListItem.CheckBox
                    checkedIcon="times"
                    key={i}
                    checked={i < (item.logs as UserLog[]).length}
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
                />
              </View>
            )}
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
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
