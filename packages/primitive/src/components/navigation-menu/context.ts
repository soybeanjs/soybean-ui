import { createContext } from '../../composables';
import type { NavigationMenuItemContext, NavigationMenuRootContext } from './types';

export const [provideNavigationMenuRootContext, injectNavigationMenuRootContext] =
  createContext<NavigationMenuRootContext>('NavigationMenuRoot');

export const [provideNavigationMenuItemContext, injectNavigationMenuItemContext] =
  createContext<NavigationMenuItemContext>('NavigationMenuItem');
