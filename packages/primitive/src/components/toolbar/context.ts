import { createContext } from '../../composables';
import type { ToolbarRootContext } from './types';

export const [provideToolbarRootContext, injectToolbarRootContext] = createContext<ToolbarRootContext>('ToolbarRoot');
