import { useContext, useUiContext } from '../../composables';
import type { TextareaRootContextParams, TextareaUiSlot } from './types';

export const [provideTextareaRootContext, useTextareaRootContext] = useContext(
  'TextareaRoot',
  (params: TextareaRootContextParams) => params
);

export const [provideTextareaUi, useTextareaUi] = useUiContext<TextareaUiSlot>('TextareaUi');
