import {
  AlignType,
  AlignTypes,
  FlexDirectionType,
  FlexStyles,
  JustifyContentType,
  StyleNumValues,
} from '../../types/styles';

const flexStyles = <FlexStyles>{};

const NUMS: StyleNumValues[] = [0, 1, 2, 3, 4, 5];

NUMS.forEach((num) => {
  flexStyles[`flex${num}`] = {
    flex: num,
  };
});

const DIRECTIONS: FlexDirectionType['options'][] = [
  'Row',
  'Column',
  'Column-reverse',
  'Row-reverse',
];

DIRECTIONS.forEach((direction) => {
  flexStyles[`flexDirection${direction}`] = {
    flexDirection: <Lowercase<typeof direction>>direction.toLowerCase(),
  };
});

type OptionMap = { [K in AlignTypes]: AlignType[Lowercase<K>]['options'][] };

const ALIGNMENTS: OptionMap = {
  Content: [
    'Center',
    'Flex-end',
    'Flex-start',
    'Space-around',
    'Space-between',
    'Stretch',
  ],
  Items: ['Baseline', 'Center', 'Flex-end', 'Flex-start', 'Stretch'],
  Self: ['Auto', 'Baseline', 'Center', 'Flex-end', 'Flex-start', 'Stretch'],
};

const alignTypes: AlignTypes[] = ['Content', 'Items', 'Self'];

alignTypes.forEach((alignType) =>
  ALIGNMENTS[alignType].forEach((alignment) => {
    // @ts-ignore
    flexStyles[`align${alignType}${alignment}`] = {
      [`align${alignType}`]: <Lowercase<typeof alignment>>(
        alignment.toLowerCase()
      ),
    };
  })
);

const justifyTypes: JustifyContentType['options'][] = [
  'Center',
  'Flex-end',
  'Flex-start',
  'Space-around',
  'Space-between',
  'Space-evenly',
];

justifyTypes.forEach((justifyType) => {
  flexStyles[`justifyContent${justifyType}`] = {
    justifyContent: <Lowercase<typeof justifyType>>justifyType.toLowerCase(),
  };
});

export default flexStyles;
