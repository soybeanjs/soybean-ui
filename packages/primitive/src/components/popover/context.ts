import { createContext } from '../../composables';
import type { PopoverRootContext } from './types';

export const [providePopoverRootContext, injectPopoverRootContext] = createContext<PopoverRootContext>('PopoverRoot');
