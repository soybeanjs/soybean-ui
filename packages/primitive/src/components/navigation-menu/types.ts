import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { DataOrientation, Direction } from '../../types';
import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer';

// Root
export interface NavigationMenuRootProps {
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
  /** The orientation of the menu. */
  orientation?: DataOrientation;
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
export type NavigationMenuRootPropsWithPrimitive = NavigationMenuRootProps & PrimitiveProps;

export type NavigationMenuRootEmits = {
  'update:modelValue': [value: string];
};

export interface NavigationMenuRootContext {
  isRootMenu: boolean;
  modelValue: Ref<string>;
  previousValue: Ref<string>;
  baseId: string;
  dir: Ref<Direction>;
  orientation: DataOrientation;
  disableClickTrigger: Ref<boolean>;
  disableHoverTrigger: Ref<boolean>;
  unmountOnHide: Ref<boolean>;
  rootNavigationMenu: Ref<HTMLElement | undefined>;
  activeTrigger: Ref<HTMLElement | undefined>;
  indicatorTrack: Ref<HTMLElement | undefined>;
  onIndicatorTrackChange: (indicatorTrack: HTMLElement | undefined) => void;
  viewport: Ref<HTMLElement | undefined>;
  onViewportChange: (viewport: HTMLElement | undefined) => void;
  onTriggerEnter: (itemValue: string) => void;
  onTriggerLeave: () => void;
  onContentEnter: (itemValue: string) => void;
  onContentLeave: () => void;
  onItemSelect: (itemValue: string) => void;
  onItemDismiss: () => void;
}

// List
export interface NavigationMenuListProps {}
export type NavigationMenuListPropsWithPrimitive = NavigationMenuListProps & PrimitiveProps;
// Item
export interface NavigationMenuItemProps {
  value?: string;
}
export type NavigationMenuItemPropsWithPrimitive = NavigationMenuItemProps & PrimitiveProps;

export type NavigationMenuItemContext = {
  value: string;
  contentId: string;
  triggerRef: Ref<HTMLElement | undefined>;
  focusProxyRef: Ref<HTMLElement | undefined>;
  wasEscapeCloseRef: Ref<boolean>;
  onEntryKeyDown: () => void;
  onFocusProxyEnter: (side: 'start' | 'end') => void;
  onContentFocusOutside: () => void;
  onRootContentClose: () => void;
};
// Link
export interface NavigationMenuLinkProps {
  /** Used to identify the link as the currently active page. */
  active?: boolean;
}
export type NavigationMenuLinkPropsWithPrimitive = NavigationMenuLinkProps & PrimitiveProps;
export type NavigationMenuLinkEmits = {
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};

// ContentImpl
export interface NavigationMenuContentImplProps extends DismissableLayerProps {}
export type NavigationMenuContentImplPropsWithPrimitive = NavigationMenuContentImplProps & PrimitiveProps;

export type NavigationMenuContentImplEmits = DismissableLayerEmits;

// Content
export interface NavigationMenuContentProps {
  forceMount?: boolean;
}
export type NavigationMenuContentPropsWithPrimitive = NavigationMenuContentProps & PrimitiveProps;

export type NavigationMenuContentEmits = NavigationMenuContentImplEmits;

// Trigger
export interface NavigationMenuTriggerProps {
  disabled?: boolean;
}
export type NavigationMenuTriggerPropsWithPrimitive = NavigationMenuTriggerProps & PrimitiveProps;
// Viewport
export interface NavigationMenuViewportProps {
  forceMount?: boolean;
  align?: 'start' | 'center' | 'end';
}
export type NavigationMenuViewportPropsWithPrimitive = NavigationMenuViewportProps & PrimitiveProps;
// Indicator
export interface NavigationMenuIndicatorProps {
  forceMount?: boolean;
}
export type NavigationMenuIndicatorPropsWithPrimitive = NavigationMenuIndicatorProps & PrimitiveProps;
// Sub
export interface NavigationMenuSubProps {
  modelValue?: string;
  defaultValue?: string;
  orientation?: DataOrientation;
}
export type NavigationMenuSubPropsWithPrimitive = NavigationMenuSubProps & PrimitiveProps;

export type NavigationMenuSubEmits = {
  'update:modelValue': [value: string];
};

export type MotionAttribute = 'to-start' | 'to-end' | 'from-start' | 'from-end';
