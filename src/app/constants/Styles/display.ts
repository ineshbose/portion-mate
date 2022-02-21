import { DisplayType } from '../../types/styles';

const DISPLAYS: DisplayType['options'][] = ['None', 'Flex'];

const displayStyles = <DisplayType['styles']>{};

DISPLAYS.forEach((display) => {
  displayStyles[`display${display}`] = {
    display: <Lowercase<typeof display>>display.toLowerCase(),
  };
});

export default displayStyles;
