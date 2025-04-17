import { createContext } from '@soybean-ui/primitives';
import type { TreeMenuRootContext } from './types';

export const [provideTreeMenuRootContext, injectTreeMenuRootContext] =
  createContext<TreeMenuRootContext>('TreeMenuRoot');
