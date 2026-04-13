import { useContext, useUiContext } from '../../composables';
import type { TableCompactContext, TableUiSlot } from './types';

export const [provideTableCompactContext, useTableCompactContext] = useContext<TableCompactContext>('TableCompact');

export const [provideTableUi, useTableUi] = useUiContext<TableUiSlot>('Table');
