import { createContext } from '../../composables';
import type { TabsRootContext } from './types';

export const [provideTabsRootContext, injectTabsRootContext] = createContext<TabsRootContext>('TabsRoot');
