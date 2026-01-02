import { useUiContext } from '../../composables';
import type { ListUiSlot } from './types';

export const [provideListUi, useListUi] = useUiContext<ListUiSlot>('ListUi');
