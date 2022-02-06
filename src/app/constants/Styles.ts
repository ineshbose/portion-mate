import { FlexStyle, StyleSheet } from 'react-native';

type FlexStyleProp<T extends keyof FlexStyle> = Pick<FlexStyle, T>;

type DisplayStyles = {
  displayFlex: FlexStyleProp<'display'>;
  displayNone: FlexStyleProp<'display'>;
  flexOne: FlexStyleProp<'flex'>;
  flexDirectionRow: FlexStyleProp<'flexDirection'>;
  flexCenter: FlexStyleProp<'alignItems' | 'justifyContent'>;
};

type Num = 1 | 2 | 3 | 4 | 5;
const NUMS: Num[] = [1, 2, 3, 4, 5];

type GridType = 'margin' | 'padding';
const GRIDS: GridType[] = ['margin', 'padding'];

type AREA =
  | ''
  | 'Horizontal'
  | 'Vertical'
  | 'Top'
  | 'Bottom'
  | 'Left'
  | 'Right';

const AREAS: AREA[] = [
  '',
  'Horizontal',
  'Vertical',
  'Top',
  'Bottom',
  'Left',
  'Right',
];

type GridStyles<T extends GridType> = {
  [P in `${T}${AREA}${Num}`]: FlexStyleProp<`${T}${AREA}`>;
};

const PROVIDED_STYLES = <
  DisplayStyles & GridStyles<'margin'> & GridStyles<'padding'>
>{
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
  GRIDS.forEach((prop) =>
    AREAS.forEach((area) => {
      PROVIDED_STYLES[`${prop}${area}${num}`] = {
        [`${prop}${area}`]: num * 10,
      };
    })
  )
);

export default function createStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(styles: T | StyleSheet.NamedStyles<T>) {
  return StyleSheet.create({ ...PROVIDED_STYLES, ...styles });
}
