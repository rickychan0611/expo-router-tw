// const plugin = require('tailwindcss/plugin');
import { colors } from "./colors"

module.exports = {
  theme: {
    fontFamily: {
      'mi-100': 'mi-100',
      'mi-200': 'mi-200',
      'mi-300': 'mi-300',
      'mi-400': 'mi-400',
      'mi-500': 'mi-500',
      'mi-600': 'mi-600',
      'mi-700': 'mi-700',
      'mi-800': 'mi-800',
      'mi-900': 'mi-900',
      'mi-1000': 'mi-1000',
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