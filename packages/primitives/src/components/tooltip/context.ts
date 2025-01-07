import { createContext } from '../../composables';
import type { TooltipProviderContext, TooltipRootContext } from './types';

export const [provideTooltipRootContext, injectTooltipRootContext] = createContext<TooltipRootContext>('TooltipRoot');

export const [provideTooltipProviderContext, injectTooltipProviderContext] =
  createContext<TooltipProviderContext>('TooltipProvider');
