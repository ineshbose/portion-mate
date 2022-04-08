import React from 'react';
import { Image, ImageProps, Pressable, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { useAppContext } from '../contexts';
import {
  HomePage,
  JournalPage,
  ResourcesPage,
  SettingsPage,
  StatsPage,
} from '../screens/BottomTab';
import { IconOptions } from '../types';
import {
  RootTabParamList,
  RouteActionIcon,
  TabConfig,
} from '../types/navigation';
import FAB from '../components/FAB';
import createStyle from '../constants/Styles';
import ActionNavigator from './ActionNavigator';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const headerButtonIcons: RouteActionIcon<Partial<RootTabParamList>> = {
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
  {
    name: 'Settings',
    component: SettingsPage,
    hideTab: true,
  },
  {
    name: 'Action',
    component: ActionNavigator,
    hideTab: true,
  },
];

export default function BottomTabNavigator({
  navigation,
  route,
}: BottomTabScreenProps<RootTabParamList>) {
  const {
    headerAction,
    helpers: { signOut, setHeaderAction },
  } = useAppContext();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const navigationLeftAccessory = (props: {} | undefined) => (
    <Pressable
      {...props}
      style={[styles.flexDirectionRow, styles.alignItemsCenter]}
      onPress={() => navigation.navigate('Home')}
    >
      <Image
        // @ts-ignore
        style={styles.appIcon}
        source={{
          uri: 'https://portion-mate.readthedocs.io/en/latest/assets/logo.png',
        }}
      />
      <Text category="s2">Portion Mate</Text>
    </Pressable>
  );

  const navRightAccessoryActionIcon = (
    props: Partial<ImageProps> | undefined,
    { name }: RouteProp<ParamListBase, string> | { name: string }
  ) => (
    <Icon key="action" name={headerButtonIcons[name]} size={30} {...props} />
  );

  const cardIcons = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon name={name} {...props} />;

  const userAvatar = (props: Partial<ImageProps> | undefined) => (
    <Icon key="user" name="person" {...props} />
  );

  const userOptionsToggle = (props: {} | undefined) => (
    <Button
      accessoryLeft={userAvatar}
      onPress={() => setModalVisible(true)}
      appearance="ghost"
      {...props}
    />
  );

  const navigationRightAccessory = (
    props: {} | undefined,
    { route: { name } }: BottomTabHeaderProps
  ) => (
    <View style={styles.flexDirectionRow} {...props}>
      {headerButtonIcons[name] && (
        <Button
          appearance="ghost"
          accessoryLeft={(p) => navRightAccessoryActionIcon(p, { name })}
          onPress={() => setHeaderAction(headerAction === name ? '' : name)}
        />
      )}
      <OverflowMenu
        anchor={userOptionsToggle}
        backdropStyle={styles.backdropBackground}
        onBackdropPress={() => setModalVisible(false)}
        visible={modalVisible}
        onSelect={() => setModalVisible(false)}
      >
        <MenuItem
          title="Settings"
          accessoryLeft={(p) => cardIcons(p, 'settings')}
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          title="Sign Out"
          accessoryLeft={(p) => cardIcons(p, 'logout')}
          onPress={() => signOut()}
        />
      </OverflowMenu>
    </View>
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
      {...props}
    >
      {tabs
        .filter((tab) => !tab.hideTab)
        .map((tab) => (
          <BottomNavigationTab
            key={tab.name}
            icon={(p) => navTabIcon(tab, p)}
            title={tab.name}
          />
        ))}
    </BottomNavigation>
  );

  return (
    <>
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
          <BottomTab.Screen key={tab.name} {...tab} />
        ))}
      </BottomTab.Navigator>
      <FAB
        actions={[
          {
            icon: 'library-add',
            name: 'Item',
            text: 'Food Item',
          },
          {
            icon: 'note-add',
            name: 'Journal',
            text: 'Journal Entry',
          },
        ]}
        floatingIcon="add"
        onPressAction={(name) =>
          navigation.navigate('Action', { screen: name })
        }
        distanceToEdge={{ vertical: 80, horizontal: 30 }}
        visible={getFocusedRouteNameFromRoute(route) !== 'Action'}
      />
    </>
  );
}

const styles = createStyle({
  appIcon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  backdropBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
