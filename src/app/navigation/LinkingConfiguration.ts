/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import { makeUrl } from 'expo-linking';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [makeUrl('/')],
  config: {
    screens: {
      Root: {
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
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
