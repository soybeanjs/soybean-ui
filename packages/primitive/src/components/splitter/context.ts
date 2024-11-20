import { createContext } from '../../composables';
import type { PanelGroupContext } from './types';

export const [provideSplitterGroupContext, injectSplitterGroupContext] =
  createContext<PanelGroupContext>('SplitterGroup');
