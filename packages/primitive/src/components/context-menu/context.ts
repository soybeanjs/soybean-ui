import { createContext } from '../../composables';
import type { ContextMenuRootContext } from './types';

export const [provideContextMenuRootContext, injectContextMenuRootContext] =
  createContext<ContextMenuRootContext>('ContextMenuRoot');
