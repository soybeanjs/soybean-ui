import { useUiContext } from '../../composables';
import type { CodeUiSlot } from './types';

export const [provideCodeUi, useCodeUi] = useUiContext<CodeUiSlot>('CodeUi');
