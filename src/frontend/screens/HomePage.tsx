import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { View } from '../components/Themed';
import { RootTabScreenProps, TrackItem, PortionItem, UserLog } from '../types';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      {list.map((item) => (
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            {item.item && (
              <ListItem.Title>{(item.item as PortionItem).name}</ListItem.Title>
            )}
          </ListItem.Content>
          {Array.from(Array(item.target), (e, i) => (
            <ListItem.CheckBox
              checkedIcon="times"
              key={i}
              checked={i < (item.logs as UserLog[]).length}
            />
          ))}
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
