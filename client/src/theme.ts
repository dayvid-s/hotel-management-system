import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/manrope';

export const newTheme = extendTheme({
  fonts: {
    heading: `'Manrope Variable', sans-serif`,
    body: `'Manrope Variable', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#ebf8ff',
      },
    },
  },
});