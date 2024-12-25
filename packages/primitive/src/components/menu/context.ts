import { createContext } from '../../composables';
import type {
  MenuContentContext,
  MenuContext,
  MenuItemIndicatorContext,
  MenuRadioGroupContext,
  MenuRootContext,
  MenuSubContext
} from './types';

export const [provideMenuRootContext, injectMenuRootContext] = createContext<MenuRootContext>('MenuRoot');
export const [provideMenuContext, injectMenuContext] = createContext<MenuContext>('Menu');

export const [provideMenuContentContext, injectMenuContentContext] = createContext<MenuContentContext>('MenuContent');

export const [provideMenuItemIndicatorContext, injectMenuItemIndicatorContext] =
  createContext<MenuItemIndicatorContext>('MenuItemIndicatorContext');

export const [provideMenuSubContext, injectMenuSubContext] = createContext<MenuSubContext>('MenuSub');

export const [provideMenuRadioGroupContext, injectMenuRadioGroupContext] =
  createContext<MenuRadioGroupContext>('MenuRadioGroup');
