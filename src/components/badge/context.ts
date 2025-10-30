import { useContext } from '../../composables';
import type { BadgeRootContextParams, BadgeThemeContextParams } from './types';

export const [provideBadgeRootContext, useBadgeRootContext] = useContext(
  'BadgeRoot',
  (params: BadgeRootContextParams) => params
);

export const [provideBadgeThemeContext, useBadgeThemeContext] = useContext(
  'BadgeTheme',
  (params: BadgeThemeContextParams) => params
);
