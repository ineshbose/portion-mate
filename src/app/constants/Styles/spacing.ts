import {
  SpacingDirections,
  SpacingStyles,
  SpacingTypes,
  StyleNumValues,
} from '../../types/styles';

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

const spacingStyles = <SpacingStyles>{};

NUMS.forEach((num) =>
  SPACINGS.forEach((spacing) =>
    DIRECTIONS.forEach((direction) => {
      spacingStyles[`${spacing}${direction}${num}`] = {
        [`${spacing}${direction}`]: num * 16,
      };
    })
  )
);

export default spacingStyles;
