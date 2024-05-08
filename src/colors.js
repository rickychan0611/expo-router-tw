import adjustColorBrightness from "./utils/adjustBrightness";

export const colors = {
  white: '#ffffff',
  black: '#111112',
  background: {
    DEFAULT: '#E1E1E1',
    dark: '#111112'
  },
  card: {
    DEFAULT: '#ffffff',
    dark: '#272629'
  },
  text: {
    DEFAULT: '#111112',
    dark: '#ffffff'
  },
  muted: {
    DEFAULT: '#989596',
    dark: '#524E4F'
  },
  input: {
    DEFAULT: '#ffffff',
    dark: '#111112'
  },
  divider: {
    DEFAULT: '#817C7D',
    dark: '#3d3a3a'
  },
  border: {
    DEFAULT: '#817C7D',
    dark: '#262424'
  },
  primary: {
    DEFAULT: '#832E33',
    foreground: adjustColorBrightness('#832E33', 0.6),
    100: '#FAEBE9',
    200: '#F4DAD7',
    300: '#EBBCB6',
    400: '#DF938D',
    500: '#D06863',
    600: '#B14141',
    700: '#9C3437',
    800: '#832E33',
    900: '#712A30',
    1000: '#3E1316',
    "dark": {
      DEFAULT: adjustColorBrightness('#832E33', 0.2),
      foreground: adjustColorBrightness('#832E33', 0.6),
      1000: '#FAEBE9',
      900: '#F4DAD7',
      800: '#EBBCB6',
      700: '#DF938D',
      600: '#D06863',
      500: '#B14141',
      400: '#9C3437',
      300: '#832E33',
      200: '#712A30',
      100: '#3E1316'
    },
  },

  secondary: {
    DEFAULT: '#15578F',
    foreground: adjustColorBrightness('#15578F', 0.7),
    1000: '#0F2842',
    900: '#173F63',
    800: '#164B76',
    700: '#15578F',
    600: '#1953b0',
    500: '#288CD4',
    400: '#4EA4E2',
    300: '#8CC4ED',
    200: '#C2DEF5',
    100: '#EOEFF9',
    "dark": {
      DEFAULT: '#15578F',
      foreground: adjustColorBrightness('#15578F', 0.5),
      100: '#0F2842',
      200: '#173F63',
      300: '#164B76',
      400: '#15578F',
      500: '#196DBO',
      600: '#288CD4',
      700: '#4EA4E2',
      800: '#8CC4ED',
      900: '#C2DEF5',
      1000: '#EOEFF9'
    },
  },

  neutral: {
    1000: '#1C1C1E',
    900: '#2D2A2D',
    800: '#3D393B',
    700: '#524E4F',
    600: '#696566',
    500: '#817C7D',
    400: '#989596',
    300: '#B0AFAF',
    200: '#C9C8C8',
    100: '#E1E1E1',
    50: '#EFEEEE',
    "dark": {
      50: '#1C1C1E',
      100: '#2D2A2D',
      200: '#3D393B',
      300: '#524E4F',
      400: '#696566',
      500: '#817C7D',
      600: '#989596',
      700: '#B0AFAF',
      800: '#C9C8C8',
      900: '#E1E1E1',
      1000: '#EFEEEE',
    },
  },

  success: {
    DEFAULT: '#309056',
    100: '#C4EBD4',
    200: '#8AD8A8',
    300: '#309056',
  },
  warning: {
    DEFAULT: '#BB7300',
    100: '#FFE0AF',
    200: '#FFA20D',
    300: '#BB7300',
  },
  error: {
    DEFAULT: '#DC1F28',
    100: '#F4B3B6',
    200: '#EA676D',
    300: '#DC1F28',
  }
}