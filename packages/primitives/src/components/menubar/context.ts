import { createContext } from '../../composables';
import type { MenubarMenuContext, MenubarRootContext } from './types';

export const [provideMenubarRootContext, injectMenubarRootContext] = createContext<MenubarRootContext>('MenubarRoot');
export const [provideMenubarMenuContext, injectMenubarMenuContext] = createContext<MenubarMenuContext>('MenubarMenu');
