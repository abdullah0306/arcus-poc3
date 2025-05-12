import { extendTheme } from '@chakra-ui/react'
import {
  theme as baseTheme,
  /* withColorScheme */
} from '@saas-ui-pro/react'

// import { theme as glassTheme } from '@saas-ui-pro/theme-glass'
import { components } from './components'
import { colors } from './foundations/colors'
import { semanticTokens } from './foundations/semantic-tokens'

// import colorScheme from './color-schemes/galaxy'
// import colorScheme from './color-schemes/earth'

export const theme = extendTheme(
  {
    colors,
    semanticTokens,
    components,
    fonts: {
      heading: 'Lato, sans-serif',
      body: 'Lato, sans-serif',
      mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  },
  {
    colors: {
      primary: colors.brand,
    },
  },
  baseTheme,
)
