import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';
import {
  RootTabParamList,
  RouteActionIcon,
  TabConfig,
} from '../types/navigation';
import { Text } from '../components/Themed';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Icon,
  Modal,
  TopNavigation,
} from '@ui-kitten/components';
import HomePage from '../screens/HomePage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import StatsPage from '../screens/StatsPage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JournalPage from '../screens/JournalPage';
import ResourcesPage from '../screens/ResourcesPage';
import { useAppContext } from '../contexts/AppContext';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const headerButtonIcons: RouteActionIcon<RootTabParamList> = {
  Home: 'edit',
  Journal: 'calendar-today',
  Stats: 'calendar-today',
  Resources: 'star',
};

const tabs: TabConfig<RootTabParamList>[] = [
  {
    name: 'Home',
    component: HomePage,
    icon: 'home',
  },
  // {
  //   name: 'Journal',
  //   component: JournalPage,
  //   icon: 'book',
  // },
  // {
  //   name: 'Stats',
  //   component: StatsPage,
  //   icon: 'bar-chart',
  // },
  {
    name: 'Resources',
    component: ResourcesPage,
    icon: 'menu-book',
  },
];

export default function BottomTabNavigator() {
  const {
    user,
    helpers: { signOut },
  } = useAppContext();
  const [action, setAction] = React.useState<string>('');
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        header: ({ route }) => {
          return (
            <TopNavigation
              accessoryLeft={
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
                  <Text>Portion Mate</Text>
                </Text>
              }
              accessoryRight={
                <ButtonGroup>
                  <Button
                    accessoryLeft={
                      <Icon
                        key="action"
                        name={
                          headerButtonIcons[
                            route.name as keyof RootTabParamList
                          ]
                        }
                        size={30}
                      />
                    }
                    onPress={() =>
                      setAction(action === route.name ? '' : route.name)
                    }
                  />
                  <Button
                    accessoryLeft={
                      <Avatar
                        key="profile"
                        source={{ uri: 'https://picsum.photos/10' }}
                      />
                    }
                    onPress={() => setModalVisible(true)}
                  />
                  <Modal
                    visible={modalVisible}
                    backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onBackdropPress={() => setModalVisible(false)}
                  >
                    <Card>
                      {user?.forename && <Text>Hello, {user.forename}</Text>}
                      <Button disabled>Settings</Button>
                      <Button onPress={() => signOut()}>Sign Out</Button>
                    </Card>
                  </Modal>
                </ButtonGroup>
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
              ...args,
            })
          }
          options={{
            title: tab.name,
            tabBarIcon: ({ color }) => (
              <Icon
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
