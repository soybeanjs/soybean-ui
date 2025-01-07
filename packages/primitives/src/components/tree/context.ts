import { createContext } from '../../composables';
import type { TreeRootContext } from './types';

export const [provideTreeRootContext, injectTreeRootContext] = createContext<TreeRootContext>('TreeRoot');
