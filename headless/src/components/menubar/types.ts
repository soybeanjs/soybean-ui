import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Direction, PropsToContext } from '../../types';
import type {
  MenuContentEmits,
  MenuContentProps,
  MenuSubTriggerProps,
  MenuTriggerProps
} from '../menu/types';
import type { PrimitiveProps } from '../primitive/types';

export interface MenubarRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the menu to open. Can be used as `v-model`. */
  modelValue?: string;
  /** The value of the menu that should be open when initially rendered. Use when you do not need to control the value state. */
  defaultValue?: string;
  /**
   * The reading direction of the menubar when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop from last item to first, and vice versa.
   *
   * @defaultValue false
   */
  loop?: boolean;
}

export type MenubarRootEmits = {
  /** Event handler called when the active menu value changes. */
  'update:modelValue': [value: string];
};

export interface MenubarMenuProps {
  /**
   * A unique value that associates the menu with an active value when the menubar is controlled.
   *
   * This prop is managed automatically when uncontrolled.
   */
  value?: string;
}

export interface MenubarTriggerProps extends MenuTriggerProps {}

export interface MenubarContentProps extends MenuContentProps {}

export type MenubarContentEmits = MenuContentEmits;

export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

export interface MenubarRootContextParams extends PropsToContext<MenubarRootProps, 'dir' | 'loop'> {
  currentTabStopId: ShallowRef<string | null | undefined>;
  modelValue: ShallowRef<string | undefined>;
}

export interface MenubarRootContext extends Omit<MenubarRootContextParams, 'dir'> {
  dir: ComputedRef<Direction>;
  onMenuOpen: (value: string) => void;
  onMenuClose: () => void;
  onMenuToggle: (value: string) => void;
}

export interface MenubarMenuContextParams {
  value: ComputedRef<string>;
}

export interface MenubarMenuContext extends MenubarMenuContextParams {
  contentId: ShallowRef<string>;
  initContentId: () => void;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  triggerId: ShallowRef<string>;
  initTriggerId: () => void;
  onTriggerElementChange: (element: HTMLElement) => void;
  wasKeyboardTriggerOpenRef: ShallowRef<boolean>;
}

export interface MenubarCollectionItemData {
  value: string;
}
