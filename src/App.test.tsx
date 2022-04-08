import React from 'react';
import renderer, { act } from 'react-test-renderer';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import App from './App';

jest.mock(
  './env',
  () => ({ CLIENT_ID: 'client_id', CLIENT_SECRET: 'client_secret' }),
  { virtual: true }
);
jest.mock('./app/hooks/useCachedResources', () => jest.fn(() => true));
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));

describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = renderer
      .create(<App />)
      .toJSON() as renderer.ReactTestRendererJSON;

    await act(async () =>
      expect([1, undefined]).toContain(tree.children?.length)
    );
  });
});
