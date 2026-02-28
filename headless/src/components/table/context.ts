import { useUiContext } from '../../composables';
import type { TableUiSlot } from './types';

export const [provideTableUi, useTableUi] = useUiContext<TableUiSlot>('Table');
