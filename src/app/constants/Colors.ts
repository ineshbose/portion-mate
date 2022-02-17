import { default as colors } from '../assets/theme.json';
import { StatusOptions } from '../types/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const states: StatusOptions[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primary = colors['color-primary-500'];
const secondary = colors['color-warning-500'];

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  primary,
  secondary,
};
