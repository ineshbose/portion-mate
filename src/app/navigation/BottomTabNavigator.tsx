import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, ImageProps } from 'react-native';
import {
  RootTabParamList,
  RouteActionIcon,
  TabConfig,
} from '../types/navigation';
import {
  BottomNavigation,
  BottomNavigationTab,
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
import { useThemeContext } from '../contexts/ThemeContext';
import { ParamListBase, RouteProp } from '@react-navigation/native';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user,
    helpers: { signOut },
  } = useAppContext();
  const { ThemeToggle } = useThemeContext();
  const [action, setAction] = React.useState<string>('');
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const navigationLeftAccessory = (props: {} | undefined) => (
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

  const navRightAccessoryActionIcon = (
    props: Partial<ImageProps> | undefined,
    route: RouteProp<ParamListBase, string>
  ) => (
    <Icon
      key="action"
      name={headerButtonIcons[route.name as keyof RootTabParamList]}
      size={30}
      {...props}
    />
  );

  const userAvatar = (props: Partial<ImageProps> | undefined) => (
    <Icon key="user" name="person" {...props} />
  );

  const navigationRightAccessory = (
    props: {} | undefined,
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
          {/* {user?.forename && <Text>Hello, {user.forename}</Text>} */}
          <Button disabled>Settings</Button>
          <ThemeToggle appearance="filled" />
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

  const navTabIcon = (
    tab: RootTab,
    props?:
      | {
          focused: boolean;
          color: string;
          size: number;
        }
      | Partial<ImageProps>
  ) => <Icon name={tab.icon} {...props} />;

  const TabBar = (props: BottomTabBarProps) => (
    <BottomNavigation
      selectedIndex={props.state.index}
      onSelect={(index) =>
        props.navigation.navigate(props.state.routeNames[index])
      }
      appearance="noIndicator"
    >
      {tabs.map((tab) => (
        <BottomNavigationTab
          key={tab.name}
          icon={(p) => navTabIcon(tab, p)}
          title={tab.name}
        />
      ))}
    </BottomNavigation>
  );

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={TabBar}
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        header: navigationHeader,
        headerShown: true,
      }}
    >
      {tabs.map((tab) => (
        <BottomTab.Screen key={tab.name} name={tab.name}>
          {/* https://github.com/react-navigation/react-navigation/issues/8517 */}
          {(props) =>
            tab.component({
              isAction: action === tab.name,
              ...props,
            })
          }
        </BottomTab.Screen>
      ))}
    </BottomTab.Navigator>
  );
}
