import { useContext, useUiContext } from '../../composables';
import type { InputOptRootContext, InputOptUiSlot } from './types';

export const [provideInputOptRootContext, useInputOptRootContext] = useContext<InputOptRootContext>('InputOptRoot');

export const [provideInputOptUi, useInputOptUi] = useUiContext<InputOptUiSlot>('InputOptUi');
