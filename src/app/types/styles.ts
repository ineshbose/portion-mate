import { FlexStyle, TextStyle } from 'react-native';

export type PickStyleProp<S, T extends keyof S = keyof S> = Pick<S, T>;

export type FlexStyleProp<T extends keyof FlexStyle = keyof FlexStyle> =
  PickStyleProp<FlexStyle, T>;

export type TextStyleProp<T extends keyof TextStyle = keyof TextStyle> =
  PickStyleProp<TextStyle, T>;

export type DisplayOptions = NonNullable<FlexStyle['display']>;

export type DisplayStyles<T extends DisplayOptions = DisplayOptions> = {
  [P in `display${Capitalize<T>}`]: FlexStyleProp<'display'>;
};

export type StyleNumValues = 1 | 2 | 3 | 4 | 5;

export type SpacingTypes = 'margin' | 'padding';

export type SpacingDirections =
  | ''
  | 'Horizontal'
  | 'Vertical'
  | 'Top'
  | 'Bottom'
  | 'Left'
  | 'Right';

export type SpacingStyles<T extends SpacingTypes = SpacingTypes> = {
  [P in `${T}${SpacingDirections}${StyleNumValues}`]: FlexStyleProp<`${T}${SpacingDirections}`>;
};

export type FontWeights = NonNullable<TextStyle['fontWeight']>;

export type FontWeightStyles<T extends FontWeights = FontWeights> = {
  [P in `fontWeight${Capitalize<T>}`]: TextStyleProp<'fontWeight'>;
};

export type StatusOptions =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type FontColorStyles<T extends StatusOptions = StatusOptions> = {
  [P in `text${Capitalize<T>}`]: TextStyleProp<'color'>;
};

export type BackgroundColorStyles<T extends StatusOptions = StatusOptions> = {
  [P in `bg${Capitalize<T>}`]: TextStyleProp<'backgroundColor'>;
};

export type BorderDirections = Exclude<
  SpacingDirections,
  'Horizontal' | 'Vertical'
>;

export type BorderWeightStyles = {
  [P in `border${BorderDirections}${StyleNumValues}`]: TextStyleProp<`border${BorderDirections}Width`>;
};

export type BorderColorStyles<T extends StatusOptions = StatusOptions> = {
  [P in `border${Capitalize<T>}`]: TextStyleProp<'borderColor'>;
};

export type CustomStyles = {
  flexOne: FlexStyleProp<'flex'>;
  flexDirectionRow: FlexStyleProp<'flexDirection'>;
  flexCenter: FlexStyleProp<'alignItems' | 'justifyContent'>;
};

export type GlobalStyleSheet = DisplayStyles & SpacingStyles & CustomStyles;
