import type { ShallowRef } from 'vue';
import type { PropsToContext } from '../../types';
import type { MenuContentEmits, MenuContentProps, MenuRootEmits, MenuRootProps, MenuTriggerProps } from '../menu/types';

export interface ContextMenuRootProps extends Omit<MenuRootProps, 'open' | 'defaultOpen'> {
  /**
   * The duration from when the trigger is pressed until the menu opens.
   *
   * @defaultValue 700
   */
  pressOpenDelay?: number;
}
export type ContextMenuRootEmits = MenuRootEmits;

export type ContextMenuContentProps = Omit<
  MenuContentProps,
  'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'
>;
export type ContextMenuContentEmits = MenuContentEmits;

export interface ContextMenuRootContextParams extends PropsToContext<
  ContextMenuRootProps,
  'dir' | 'modal' | 'pressOpenDelay'
> {
  open: ShallowRef<boolean | undefined>;
}
export interface ContextMenuTriggerProps extends MenuTriggerProps {
  /**
   * The reference element for the context menu trigger.
   */
  reference?: HTMLElement | null;
}
