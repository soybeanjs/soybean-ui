import { createContext } from '@soybean-ui/primitives';
import type { SidebarMenuRootContext } from './types';

export const [provideSidebarMenuRootContext, injectSidebarMenuRootContext] =
  createContext<SidebarMenuRootContext>('SidebarMenuRoot');
