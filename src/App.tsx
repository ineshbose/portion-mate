import React from 'react';
import { ImageProps } from 'react-native';
import { mapping, light, dark } from '@eva-design/eva';
import {
  ApplicationProvider,
  Button,
  ButtonProps,
  Icon,
  IconRegistry,
} from '@ui-kitten/components';
import { MaterialIconsPack } from './app/components/AppIcons';
import { ColorScheme } from './app/types';
import { ThemeContext } from './app/contexts/ThemeContext';
import { getData, storeData } from './app/api/store';
import useCachedResources from './app/hooks/useCachedResources';
import Navigation from './app/navigation';
import { default as colors } from './app/assets/theme.json';
import { default as customMapping } from './app/assets/mapping.json';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [theme, setTheme] = React.useState<ColorScheme>('light');
  const isLightTheme = theme === 'light';

  React.useEffect(() => {
    const getSetTheme = async () => {
      const themeData = (await getData('theme', 'light')) as ColorScheme;
      setTheme(themeData);
    };

    getSetTheme();
  }, [setTheme]);

  const switchTheme = async () => {
    const newTheme = isLightTheme ? 'dark' : 'light';
    setTheme(newTheme);
    await storeData('theme', newTheme);
  };

  const toggleIcon = (props: Partial<ImageProps> | undefined) => (
    <Icon
      key="themeToggle"
      name={isLightTheme ? 'brightness-2' : 'brightness-7'}
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
          mapping={mapping}
          customMapping={customMapping}
          theme={{ ...(isLightTheme ? light : dark), ...colors }}
        >
          <Navigation />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  ) : null;
}
