import { useContext } from '../../composables';
import type { SeparatorThemeContextParams } from './types';

export const [provideSeparatorThemeContext, useSeparatorThemeContext] = useContext(
  'SeparatorTheme',
  (params: SeparatorThemeContextParams) => params
);
