import { FlexStyle, TextStyle } from 'react-native';

type StringOptions<T> = T extends string ? Capitalize<T> : T;

type StyleOptions<
  T extends FlexStyle | TextStyle = FlexStyle,
  K extends keyof T = keyof T
> = StringOptions<NonNullable<PickStyleProp<T, K>[K]>>;

export type StatusOptions =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

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

type PickStyleProp<
  S extends FlexStyle | TextStyle = FlexStyle,
  T extends keyof S = keyof S
> = Pick<S, T>;

type FlexStyleProp<T extends keyof FlexStyle = keyof FlexStyle> = PickStyleProp<
  FlexStyle,
  T
>;

type TextStyleProp<T extends keyof TextStyle = keyof TextStyle> = PickStyleProp<
  TextStyle,
  T
>;

type StyleType<
  T extends FlexStyle | TextStyle = FlexStyle,
  K extends string & keyof T = string & keyof T,
  O extends StyleOptions<T, K> = StyleOptions<T, K>
> = {
  options: O;
  styles: {
    [P in `${K}${Capitalize<string & StyleOptions<T, K>>}`]: PickStyleProp<
      T,
      K
    >;
  };
};

export type DisplayType = StyleType<FlexStyle, 'display'>;
export type FlexDirectionType = StyleType<FlexStyle, 'flexDirection'>;
export type AlignTypes = 'Items' | 'Self' | 'Content';
export type AlignType<
  T extends FlexStyle = FlexStyle,
  K extends AlignTypes = AlignTypes
> = {
  //Record<K, StyleType<T, `align${Capitalize<K>}`>>
  [P in Lowercase<K>]: StyleType<T, `align${Capitalize<P>}`>;
};

export type JustifyContentType = StyleType<FlexStyle, 'justifyContent'>;

export type FlexStyles = FlexDirectionType['styles'] &
  AlignType['items']['styles'] &
  AlignType['self']['styles'] &
  AlignType['content']['styles'] &
  JustifyContentType['styles'];

export type FontWeightType = StyleType<TextStyle, 'fontWeight'>;

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
};

export type GlobalStyleSheet = DisplayType['styles'] &
  SpacingStyles &
  FlexStyles &
  CustomStyles;
