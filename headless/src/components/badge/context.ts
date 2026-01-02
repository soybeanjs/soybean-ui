import { useContext, useUiContext } from '../../composables';
import type { BadgeRootContextParams, BadgeUiSlot } from './types';

export const [provideBadgeRootContext, useBadgeRootContext] = useContext(
  'BadgeRoot',
  (params: BadgeRootContextParams) => params
);

export const [provideBadgeUi, useBadgeUi] = useUiContext<BadgeUiSlot>('BadgeUi');
