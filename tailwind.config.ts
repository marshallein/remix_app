import type { Config } from 'tailwindcss';

export default {
   content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#FAFFC5',
            secondary: '#A9BFA8',
            alternative_1: '#5E686D',
            alternative_2: '#3A3960',
         },
         fontFamily: {
            sans: [
               'Inter',
               'ui-sans-serif',
               'system-ui',
               'sans-serif',
               'Apple Color Emoji',
               'Segoe UI Emoji',
               'Segoe UI Symbol',
               'Noto Color Emoji',
            ],
         },
      },
   },
   plugins: [],
} satisfies Config;
