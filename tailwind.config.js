// const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    colors: {
      primary: {
        '100': '#f5e3e3',
        '200': '#eac7c7',
        '300': '#e0abab',
        '400': '#d68f8f',
        '500': '#B14141',
        '600': '#c15757',
        '700': '#973737',
        '800': '#7c2e2e',
        '900': '#622424',
        '1000': '#471a1a'
      },
      secondary: {
        '100': '#e0eff9',
        '200': '#c1def3',
        '300': '#a2ceed',
        '400': '#83bde8',
        '500': '#64ade2',
        '600': '#459ddc',
        '700': '#2277bz4',
        '800': '#1c6294',
        '900': '#164d75',
        '1000': '#103855'
      }
    }
  },
  // plugins: [
  //   plugin(({ addUtilities }) => {
  //     addUtilities({
  //       '.btn': {
  //         padding: 3,
  //         borderRadius: 10,
  //         textTransform: `uppercase`,
  //         backgroundColor: `#333`,
  //       },
  //       '.resize-repeat': {
  //         resizeMode: `repeat`,
  //       },
  //     });
  //   }),
  // ],
};