import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';
import {
  RootTabParamList,
  RouteActionIcon,
  TabConfig,
} from '../types/navigation';
import {
  Button,
  ButtonGroup,
  Card,
  Icon,
  Modal,
  Text,
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

type RootTab = TabConfig<RootTabParamList>;

const tabs: RootTab[] = [
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

  const navigationLeftAccessory = (props: any) => (
    <Text {...props}>
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
  );

  const navRightAccessoryActionIcon = (props: any, route: any) => (
    <Icon
      key="action"
      name={headerButtonIcons[route.name as keyof RootTabParamList]}
      size={30}
      {...props}
    />
  );

  const userAvatar = (props: any) => (
    <Icon key="user" name="person" {...props} />
  );

  const navigationRightAccessory = (
    props: any,
    { route }: BottomTabHeaderProps
  ) => (
    <ButtonGroup appearance="ghost" {...props}>
      <Button
        accessoryLeft={(p) => navRightAccessoryActionIcon(p, route)}
        onPress={() => setAction(action === route.name ? '' : route.name)}
      />
      <Button
        accessoryLeft={userAvatar}
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
  );

  const navigationHeader = (props: BottomTabHeaderProps) => (
    <TopNavigation
      accessoryLeft={navigationLeftAccessory}
      accessoryRight={(p) => navigationRightAccessory(p, props)}
    />
  );

  const navTabComponent = (tab: RootTab, props: any) =>
    tab.component({
      isAction: action === tab.name,
      ...props,
    });

  const navTabIcon = (
    tab: RootTab,
    props: {
      focused: boolean;
      color: string;
      size: number;
    }
  ) => <Icon style={{ marginBottom: -3 }} name={tab.icon} {...props} />;

  const navigationTabScreens = (tab: RootTab) => (
    <BottomTab.Screen
      key={tab.name}
      name={tab.name}
      component={(props) => navTabComponent(tab, props)}
      options={{
        title: tab.name,
        tabBarIcon: (props) => navTabIcon(tab, props),
      }}
    />
  );

  const TabScreens = (ts: RootTab[]) => ts.map(navigationTabScreens);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        header: navigationHeader,
        headerShown: true,
      }}
    >
      {TabScreens(tabs)}
    </BottomTab.Navigator>
  );
}
