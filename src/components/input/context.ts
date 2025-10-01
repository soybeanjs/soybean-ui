import { useContext } from '../../composables';
import type { InputThemeContextParams } from './types';

export const [provideInputThemeContext, useInputThemeContext] = useContext(
  'InputTheme',
  (params: InputThemeContextParams) => params
);
