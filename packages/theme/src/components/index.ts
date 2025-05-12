import { cardTheme } from './card'
import { pageTheme } from './page'
import { toolbarTheme } from './toolbar'

export const components = {
  Card: cardTheme,
  SuiToolbar: toolbarTheme,
  SuiPage: pageTheme,
  Input: {
    defaultProps: {
      focusBorderColor: 'brand.400',
    },
  },
  Select: {
    defaultProps: {
      focusBorderColor: 'brand.400',
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'brand.400',
    },
  },
}
