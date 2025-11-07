import { useContext } from '@soybeanjs/headless/composables';
import type { CommandExtraThemeContextParams } from './types';

export const [provideCommandExtraThemeContext, useCommandExtraThemeContext] = useContext(
  'CommandExtraTheme',
  (params: CommandExtraThemeContextParams) => params
);
