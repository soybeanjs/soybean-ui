import { createContext } from '../../composables';
import type { PopperContentContext, PopperRootContext } from './types';

export const [providePopperRootContext, injectPopperRootContext] = createContext<PopperRootContext>('PopperRoot');

export const [providePopperContentContext, injectPopperContentContext] =
  createContext<PopperContentContext>('PopperContent');
