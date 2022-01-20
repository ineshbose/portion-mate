import * as React from 'react';
import { NativeScrollEvent, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { ColorScheme } from '../types';
import { ComponentTabArguments } from '../types/navigation';
import Colors from '../constants/Colors';
import { IconButtonGroup } from '../components/IconButtonGroup';
import { getTrackItems } from '../api/items';
import { PortionItem, TrackItems, UserLogs } from '../types/api';

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
  const [trackItems, setTrackItems] = React.useState<TrackItems>([]);

  const getItems = async () => {
    const items = (await getTrackItems()) as TrackItems;
    setTrackItems(items);
  };

  React.useEffect(() => {
    getItems();
  }, []);

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
                  onPress={(value) => {
                    switch (value) {
                      case 0:
                        return 'remove';
                      case 1:
                        return 'ok';
                    }
                  }}
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
