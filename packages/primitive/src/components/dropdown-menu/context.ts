import { createContext } from '../../composables';
import type { DropdownMenuRootContext } from './types';

export const [provideDropdownMenuRootContext, injectDropdownMenuRootContext] =
  createContext<DropdownMenuRootContext>('DropdownMenuRoot');
