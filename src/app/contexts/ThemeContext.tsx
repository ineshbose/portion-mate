import React from 'react';
import { Button, ButtonProps } from '@ui-kitten/components';
import { ColorScheme } from '../types';

type ThemeContextType = {
  theme: ColorScheme;
  setTheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
  switchTheme: Function;
  ThemeToggle: (props: ButtonProps | undefined) => JSX.Element;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  switchTheme: () => {},
  ThemeToggle: () => <Button />,
});

const useThemeContext = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used within an ThemeContext.Provider'
    );
  }

  return context;
};

export default useThemeContext;
