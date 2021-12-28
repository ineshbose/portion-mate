import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/HomePage';
import StatsPage from '../screens/StatsPage';
import { RootTabParamList, RouteActionIcon, TabConfig } from '../types';
import { Text, View } from '../components/Themed';
import { Header, Avatar } from 'react-native-elements';
import JournalPage from '../screens/JournalPage';
import ResourcesPage from '../screens/ResourcesPage';
import { IconButtonGroup } from '../components/IconButtonGroup';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const headerButtonIcons: RouteActionIcon = {
  Home: 'edit',
  Journal: 'calendar-today',
  Stats: 'calendar-today',
  Resources: 'star',
};

const tabs: TabConfig[] = [
  {
    name: 'Home',
    component: HomePage,
    icon: 'home',
  },
  {
    name: 'Journal',
    component: JournalPage,
    icon: 'book',
  },
  {
    name: 'Stats',
    component: StatsPage,
    icon: 'bar-chart',
  },
  {
    name: 'Resources',
    component: ResourcesPage,
    icon: 'menu-book',
  },
];

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [action, setAction] = React.useState('');

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelPosition: 'below-icon',
        header: ({ route }) => {
          return (
            <Header
              backgroundColor="transparent"
              leftComponent={
                <View>
                  <Text>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                      }}
                      source={{
                        uri: 'https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png',
                      }}
                    />
                    <Text style={{ fontSize: 18 }}>Portion Mate</Text>
                  </Text>
                </View>
              }
              rightComponent={
                <IconButtonGroup
                  buttons={[
                    <MaterialIcons
                      key="action"
                      name={
                        headerButtonIcons[route.name as keyof RootTabParamList]
                      }
                      color={Colors[colorScheme].tint}
                      size={30}
                    />,
                    <Avatar
                      key="profile"
                      rounded
                      title={'IB'}
                      source={{ uri: 'https://picsum.photos/200' }}
                    />,
                  ]}
                  onPress={() =>
                    setAction(action === route.name ? '' : route.name)
                  }
                />
              }
            />
          );
        },
        headerShown: true,
      }}
    >
      {tabs.map((tab) => (
        <BottomTab.Screen
          key={tab.name}
          name={tab.name}
          component={(args) =>
            tab.component({
              isAction: action === tab.name,
              colorScheme,
              ...args,
            })
          }
          options={{
            title: tab.name,
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                size={30}
                style={{ marginBottom: -3 }}
                name={tab.icon}
                color={color}
              />
            ),
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
