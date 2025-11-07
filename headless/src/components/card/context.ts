import { useContext } from '../../composables';
import type { CardThemeContextParams } from './types';

export const [provideCardThemeContext, useCardThemeContext] = useContext(
  'CardTheme',
  (params: CardThemeContextParams) => params
);
