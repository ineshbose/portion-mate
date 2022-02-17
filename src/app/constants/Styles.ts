import { StyleSheet } from 'react-native';
import {
  GlobalStyleSheet,
  SpacingDirections,
  SpacingTypes,
  StyleNumValues,
} from '../types/styles';

const NUMS: StyleNumValues[] = [1, 2, 3, 4, 5];

const SPACINGS: SpacingTypes[] = ['margin', 'padding'];

const DIRECTIONS: SpacingDirections[] = [
  '',
  'Horizontal',
  'Vertical',
  'Top',
  'Bottom',
  'Left',
  'Right',
];

const PROVIDED_STYLES = <GlobalStyleSheet>{
  displayFlex: {
    display: 'flex',
  },
  displayNone: {
    display: 'none',
  },
  flexOne: {
    flex: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

NUMS.forEach((num) =>
  SPACINGS.forEach((spacing) =>
    DIRECTIONS.forEach((direction) => {
      PROVIDED_STYLES[`${spacing}${direction}${num}`] = {
        [`${spacing}${direction}`]: num * 10,
      };
    })
  )
);

export default function createStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(styles: T | StyleSheet.NamedStyles<T>) {
  return StyleSheet.create({ ...PROVIDED_STYLES, ...styles });
}
