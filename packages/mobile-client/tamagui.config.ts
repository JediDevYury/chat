import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const headingFont = createInterFont();
const bodyFont = createInterFont();

const theme = {
  color: '#fff',
  backgroundColor: '#dc1b23',
};

const tamaguiConfig = createTamagui({
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: true,
  shorthands,
  tokens: { ...tokens, color: { ...tokens.color, theme: tokens.color.red5Light } },
  themes: { ...themes, theme: theme },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
