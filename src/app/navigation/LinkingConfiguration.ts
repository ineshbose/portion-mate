/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      Root: {
        path: '/',
        screens: {
          BottomTab: {
            screens: {
              Home: {},
              Journal: 'journal',
              Stats: 'stats',
              Resources: 'resources',
              Settings: 'settings',
              Action: {
                path: 'add',
                screens: {
                  Item: 'item',
                  Journal: 'journal',
                },
              },
            },
          },
          Auth: {
            screens: {
              Login: 'login',
              Register: 'register',
            },
          },
          Loading: {},
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
