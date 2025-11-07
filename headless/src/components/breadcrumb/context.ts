import { useContext } from '../../composables';
import type { BreadcrumbThemeContextParams } from './types';

export const [provideBreadcrumbThemeContext, useBreadcrumbThemeContext] = useContext(
  'BreadcrumbTheme',
  (params: BreadcrumbThemeContextParams) => params
);
