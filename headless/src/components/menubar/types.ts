import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DefinedValue, Direction, Placement, PropsToContext, UiClass } from '../../types';
import type {
  MenuPopupProps,
  MenuPortalProps,
  MenuArrowProps,
  MenuContentEmits,
  MenuContentProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubTriggerProps,
  MenuOptionsCompactProps,
  MenuOptionsCompactEmits,
  MenuOptionsCompactSlots,
  MenuOptionData,
  MenuUiSlot
} from '../menu';
import type { PrimitiveProps } from '../primitive/types';

export interface MenubarRootProps<T extends DefinedValue = DefinedValue>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /** The controlled value of the menu to open. Can be used as `v-model`. */
  modelValue?: T;
  /** The value of the menu that should be open when initially rendered. */
  defaultValue?: T;
  /** The reading direction of the menubar when applicable. */
  dir?: Direction;
  /** When `true`, keyboard navigation loops from last trigger to first and vice versa. */
  loop?: boolean;
}

export type MenubarRootEmits<T extends DefinedValue = DefinedValue> = {
  'update:modelValue': [value: T];
};

export interface MenubarMenuProps {
  /** A unique value that associates the trigger with the active root value when controlled. */
  value?: DefinedValue;
}

export interface MenubarTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, prevents the user from interacting with the trigger. */
  disabled?: boolean;
}

export interface MenubarCollectionItemData {
  value: DefinedValue;
}

export type MenubarContentEmits = MenuContentEmits;
export interface MenubarContentProps extends MenuContentProps {}

export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

export interface MenubarSubContentProps extends MenuSubContentProps {}
export type MenubarSubContentEmits = MenuSubContentEmits;

export interface MenubarCompactProps<T extends DefinedValue = DefinedValue>
  extends MenubarRootProps<T>, MenuOptionsCompactProps<T> {
  disabled?: boolean;
  placement?: Placement;
  showArrow?: boolean;
  triggerProps?: MenubarTriggerProps;
  portalProps?: MenuPortalProps;
  contentProps?: MenubarContentProps;
  popupProps?: MenuPopupProps;
  arrowProps?: MenuArrowProps;
}
export type MenubarCompactEmits<T extends DefinedValue = DefinedValue> = MenubarRootEmits<T> &
  MenuContentEmits &
  MenuOptionsCompactEmits<T>;
export type MenubarCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  trigger: (data: { item: MenuOptionData<T> }) => any;
};

export interface MenubarRootContextParams extends PropsToContext<MenubarRootProps, 'dir' | 'loop'> {
  modelValue: ShallowRef<DefinedValue>;
  currentTabStopId: ShallowRef<string | null>;
}

export interface MenubarMenuContextParams {
  value: ComputedRef<DefinedValue>;
  triggerId: string;
  contentId: ShallowRef<string>;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  wasKeyboardTriggerOpen: ShallowRef<boolean>;
  open: ComputedRef<boolean>;
}

export type MenubarUiSlot = 'root' | 'trigger' | MenuUiSlot;
export type MenubarUi = UiClass<MenubarUiSlot>;
