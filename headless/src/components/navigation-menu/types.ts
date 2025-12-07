import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  Align,
  ClassValue,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  PropsToContext
} from '../../types';
import type { LinkProps } from '../link/types';
import type { PrimitiveProps } from '../primitive/types';

export interface NavigationMenuRootProps extends /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the menu item to activate. Can be used as `v-model`. */
  modelValue?: string;
  /**
   * The value of the menu item that should be active when initially rendered.
   *
   * Use when you do not need to control the value state.
   */
  defaultValue?: string;
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   *
   * @defaultValue 200
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;

  /**
   * If `true`, menu cannot be open by click on trigger
   *
   * @defaultValue false
   */
  disableClickTrigger?: boolean;
  /**
   * If `true`, menu cannot be open by hover on trigger
   *
   * @defaultValue false
   */
  disableHoverTrigger?: boolean;
  /**
   * If `true`, menu will not close during pointer leave event
   *
   * @defaultValue false
   */
  disablePointerLeaveClose?: boolean;

  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}

export type NavigationMenuRootEmits = {
  'update:modelValue': [value: string];
};

export interface NavigationMenuViewportProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {
  align?: Align;
}

export interface NavigationMenuContentImplProps extends DismissableLayerProps, /** @vue-ignore */ HTMLAttributes {}
export type NavigationMenuContentImplEmits = DismissableLayerEmits;

export interface NavigationMenuContentProps extends NavigationMenuContentImplProps, ForceMountProps {}
export type NavigationMenuContentEmits = NavigationMenuContentImplEmits;

export interface NavigationMenuTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface NavigationMenuListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface NavigationMenuSubListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface NavigationMenuItemProps extends /** @vue-ignore */ HTMLAttributes {
  value?: string;
}

export interface NavigationMenuLinkProps extends Omit<LinkProps, 'onSelect'> {
  /** Used to identify the link as the currently active page. */
  active?: boolean;
}

export type NavigationMenuLinkEmits = {
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};

export interface NavigationMenuIndicatorProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export interface NavigationMenuSubProps extends /** @vue-ignore */ HTMLAttributes {
  modelValue?: string;
  defaultValue?: string;
}
export type NavigationMenuSubEmits = NavigationMenuRootEmits;

export type MotionAttribute = 'to-start' | 'to-end' | 'from-start' | 'from-end';

export interface NavigationMenuViewportPosition {
  left: number;
  top: number;
}

export interface NavigationMenuRootContextParams extends PropsToContext<
  Required<NavigationMenuRootProps>,
  | 'dir'
  | 'unmountOnHide'
  | 'skipDelayDuration'
  | 'delayDuration'
  | 'disableClickTrigger'
  | 'disableHoverTrigger'
  | 'disablePointerLeaveClose'
> {
  isRoot: boolean;
  modelValue: ShallowRef<string>;
}

export interface NavigationMenuItemContextParams {
  value: string;
  modelValue: ShallowRef<string>;
  contentId: string;
  triggerId: string;
  onEntryKeyDown: () => void;
  onFocusProxyEnter: (side?: Exclude<Align, 'center'>) => void;
  onContentFocusOutside: () => void;
  onRootContentClose: () => void;
}

export type NavigationMenuThemeSlot =
  | 'root'
  | 'trigger'
  | 'content'
  | 'list'
  | 'indicator'
  | 'viewport'
  | 'item'
  | 'link'
  | 'subList'
  | 'subItem'
  | 'subLink';

export type NavigationMenuUi = Record<NavigationMenuThemeSlot, ClassValue>;

export interface NavigationMenuThemeContextParams {
  ui: ComputedRef<NavigationMenuUi>;
}
