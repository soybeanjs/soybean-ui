import { useContext } from '../../composables';
import type { InputRootContextParams, InputThemeContextParams } from './types';

export const [provideInputRootContext, useInputRootContext] = useContext(
  'InputRoot',
  (params: InputRootContextParams) => params
);

export const [provideInputThemeContext, useInputThemeContext] = useContext(
  'InputTheme',
  (params: InputThemeContextParams) => params
);
