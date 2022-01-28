import React from 'react';
import * as eva from '@eva-design/eva';

import useCachedResources from './app/hooks/useCachedResources';
import Navigation from './app/navigation';
import {
  ApplicationProvider,
  Button,
  ButtonProps,
  Icon,
  IconRegistry,
} from '@ui-kitten/components';
import { default as colors } from './app/assets/theme.json';
import { default as mapping } from './app/assets/mapping.json';
import { MaterialIconsPack } from './app/components/AppIcons';
import { ColorScheme } from './app/types';
import { ThemeContext } from './app/contexts/ThemeContext';
import { ImageProps } from 'react-native';
import { getData, storeData } from './app/api/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [theme, setTheme] = React.useState<ColorScheme>('light');

  React.useEffect(() => {
    const getSetTheme = async () => {
      const themeData = (await getData('theme', 'light')) as ColorScheme;
      setTheme(themeData);
    };

    getSetTheme();
  }, [setTheme]);

  const switchTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await storeData('theme', newTheme);
  };

  const toggleIcon = (props: Partial<ImageProps> | undefined) => (
    <Icon
      key="themeToggle"
      name={theme === 'light' ? 'brightness-2' : 'brightness-7'}
      {...props}
    />
  );

  const ThemeToggle = (props: ButtonProps | undefined) => (
    <Button
      appearance="ghost"
      status="basic"
      accessoryLeft={toggleIcon}
      onPress={switchTheme}
      {...props}
    />
  );

  return isLoadingComplete ? (
    <>
      <IconRegistry icons={MaterialIconsPack} />
      <ThemeContext.Provider
        value={{ theme, setTheme, switchTheme, ThemeToggle }}
      >
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{ ...eva[theme], ...colors }}
        >
          <Navigation />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  ) : null;
}
