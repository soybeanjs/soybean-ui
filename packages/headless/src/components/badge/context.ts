import { useContext, useUiContext } from '../../composables';
import type { BadgeRootContext, BadgeUiSlot } from './types';

export const [provideBadgeRootContext, useBadgeRootContext] = useContext<BadgeRootContext>('BadgeRoot');

export const [provideBadgeUi, useBadgeUi] = useUiContext<BadgeUiSlot>('BadgeUi');
