import type { ComputedRef, ShallowRef } from 'vue';
import type { PropsToContext } from '../../types';
import type { MenuContentEmits, MenuRootEmits, MenuRootProps } from '../menu/types';

export type DropdownMenuTriggerType = 'click' | 'hover';

export interface DropdownMenuRootProps extends MenuRootProps {
  /**
   * The trigger type of the dropdown menu.
   *
   * - `click`: The dropdown menu will be opened when the trigger is clicked.
   * - `hover`: The dropdown menu will be opened when the trigger is hovered.
   *
   * @defaultValue 'click'
   */
  trigger?: DropdownMenuTriggerType;
  /**
   * The duration from when the pointer enters the trigger until the dropdown menu gets opened.
   *
   * @defaultValue 150
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;
}
export type DropdownMenuRootEmits = MenuRootEmits;

// Context
export interface DropdownMenuRootContextParams extends PropsToContext<DropdownMenuRootProps, 'dir' | 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export interface DropdownMenuHoverContextParams extends PropsToContext<
  DropdownMenuRootProps,
  'delayDuration' | 'skipDelayDuration'
> {
  hoverable: ComputedRef<boolean>;
  open: ShallowRef<boolean | undefined>;
}

export type DropdownMenuContentEmits = MenuContentEmits;

export type {
  MenuContentProps as DropdownMenuContentProps,
  MenuTriggerProps as DropdownMenuTriggerProps
} from '../menu/types';
