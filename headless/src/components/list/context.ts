import { useContext } from '../../composables';
import type { ListThemeContextParams } from './types';

export const [provideListThemeContext, useListThemeContext] = useContext(
  'ListTheme',
  (params: ListThemeContextParams) => params
);
