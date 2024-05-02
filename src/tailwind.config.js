// const plugin = require('tailwindcss/plugin');
import { colors } from "./colors"

module.exports = {
  theme: {
    fontFamily: {
      'mi': 'mi',
    },
    borderRadius: {
      'xxs': '2px',
      'xs': '4px',
      'DEFAULT': '4px',
      's': '6px',
      'sm': '8px',
      'm': '12px',
      'ml': '16px',
      'lg': '24px',
      'xl': '32px',
      'full': '999px'
    },
    extend: {
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'DEFAULT': '4px',
        's': '6px',
        'sm': '8px',
        'm': '12px',
        'ml': '16px',
        'lg': '24px',
        'xl': '32px',
        'full': '999px'
      },
      colors
    },
  },
};