import { createContext } from '../../composables';
import type { HoverCardRootContext } from './types';

export const [provideHoverCardRootContext, injectHoverCardRootContext] =
  createContext<HoverCardRootContext>('HoverCardRoot');
