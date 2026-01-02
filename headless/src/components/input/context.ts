import { useContext, useUiContext } from '../../composables';
import type { InputRootContextParams, InputUiSlot } from './types';

export const [provideInputRootContext, useInputRootContext] = useContext(
  'InputRoot',
  (params: InputRootContextParams) => params
);

export const [provideInputUi, useInputUi] = useUiContext<InputUiSlot>('InputUi');
