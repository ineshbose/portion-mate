import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { ComponentTabArguments, ColorScheme } from '../types';
import Colors from '../constants/Colors';
import { IconButtonGroup } from '../components/IconButtonGroup';
import { getTrackItems } from '../api';
import { PortionItem, TrackItem, UserLog } from '../api/types';

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

export default function HomePage({
  isAction,
  colorScheme,
}: ComponentTabArguments) {
  const [trackItems, setTrackItems] = React.useState<TrackItem[]>([]);

  const getItems = async () => {
    const response = await getTrackItems();
    const json = response;
    console.log(json);
    setTrackItems(json);
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <View style={styles.container}>
      {trackItems.map((item) => (
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
