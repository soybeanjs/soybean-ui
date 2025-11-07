import { useContext } from '../../composables';
import type { DividerThemeContextParams } from './types';

export const [provideDividerThemeContext, useDividerThemeContext] = useContext(
  'DividerTheme',
  (params: DividerThemeContextParams) => params
);
