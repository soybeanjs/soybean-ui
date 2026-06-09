import { useUiContext } from '../../composables';
import type { EmptyUiSlot } from './types';

export const [provideEmptyUi, useEmptyUi] = useUiContext<EmptyUiSlot>('EmptyUi');
