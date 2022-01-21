import React from 'react';
import * as eva from '@eva-design/eva';

import useCachedResources from './app/hooks/useCachedResources';
import Navigation from './app/navigation';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './app/assets/theme.json';
import { MaterialIconsPack } from './app/components/AppIcons';

export default function App() {
  const isLoadingComplete = useCachedResources();

  return isLoadingComplete ? (
    <>
      <IconRegistry icons={MaterialIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Navigation />
      </ApplicationProvider>
    </>
  ) : null;
}
