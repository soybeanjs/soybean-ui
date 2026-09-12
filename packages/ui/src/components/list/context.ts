import { useUiContext } from '@soybeanjs/headless/composables';
import type { ListUiSlot } from './types';

/**
 * The list family is UI-only (`list` failed headless admission), so the slot-class channel is
 * established here instead of in headless. `SList` provides the recipe, `SListItem` consumes the
 * `item` / `content` / `title` / `description` slots.
 */
export const [provideListUi, useListUi] = useUiContext<ListUiSlot>('ListUi');
