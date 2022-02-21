import { StyleSheet } from 'react-native';
import { GlobalStyleSheet } from '../../types/styles';
import displayStyles from './display';
import flexStyles from './flex';
import spacingStyles from './spacing';

const PROVIDED_STYLES = <GlobalStyleSheet>{
  ...spacingStyles,
  ...displayStyles,
  ...flexStyles,
  flexOne: {
    flex: 1,
  },
};

export default function createStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(styles: T | StyleSheet.NamedStyles<T>) {
  return StyleSheet.create({ ...PROVIDED_STYLES, ...styles });
}
