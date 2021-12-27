/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomePage from '../screens/HomePage';
import StatsPage from '../screens/StatsPage';
import {
  RootStackParamList,
  RootTabParamList,
  RouteActionIcon,
  TabConfig,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Text, View } from '../components/Themed';
import { Header, Avatar } from 'react-native-elements';
import JournalPage from '../screens/JournalPage';
import ResourcesPage from '../screens/ResourcesPage';
import { IconButtonGroup } from '../components/IconButtonGroup';
import LoginForm from '../screens/Auth/LoginForm';
import RegisterForm from '../screens/Auth/RegisterForm';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterForm}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
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

function BottomTabNavigator() {
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
