import type { ShallowRef } from 'vue';
import type {
  BaseProps,
  Align,
  DataOrientation,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  ToContext,
  UiClass
} from '../../types';
import type { IconValue } from '../_icon/types';
import type { LinkProps, LinkBaseProps, LinkBasePropsKey } from '../link/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the NavigationMenuRoot component.
 *
 * @deprecated Use `NavMenuRootProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuRootProps extends BaseProps {
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

/**
 * Events for the NavigationMenuRoot component.
 *
 * @deprecated Use `NavMenuRootEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the NavigationMenuViewport component.
 *
 * @deprecated Use `NavMenuViewportProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuViewportProps extends ForceMountProps, BaseProps {
  /**
   * Align.
   */
  align?: Align;
}

/**
 * Properties for the NavigationMenuContentImpl component.
 *
 * @deprecated Use `NavMenuContentProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuContentImplProps extends DismissableLayerProps, BaseProps {}
/**
 * Events for the NavigationMenuContentImpl component.
 *
 * @deprecated Use `NavMenuContentEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuContentImplEmits = DismissableLayerEmits;

/**
 * Properties for the NavigationMenuContent component.
 *
 * @deprecated Use `NavMenuContentProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuContentProps extends NavigationMenuContentImplProps, ForceMountProps {}
/**
 * Events for the NavigationMenuContent component.
 *
 * @deprecated Use `NavMenuContentEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuContentEmits = NavigationMenuContentImplEmits;

/**
 * Properties for the NavigationMenuTrigger component.
 *
 * @deprecated Use `NavMenuTriggerProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuTriggerProps extends PrimitiveWithBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the NavigationMenuList component.
 *
 * @deprecated Use `NavMenuListProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuListProps extends BaseProps {}

/**
 * Properties for the NavigationMenuSubList component.
 *
 * @deprecated Use `NavMenuSubContentProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuSubListProps extends BaseProps {}

/**
 * Properties for the NavigationMenuItem component.
 *
 * @deprecated Use `NavMenuItemProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuItemProps extends BaseProps {
  /**
   * Value associated with the current item.
   */
  value?: string;
}

/**
 * Properties for the NavigationMenuLink component.
 *
 * @deprecated Use `NavMenuLinkProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuLinkProps extends Omit<LinkProps, 'onSelect'> {
  /** Used to identify the link as the currently selected page. */
  selected?: boolean;
}

/**
 * Events for the NavigationMenuLink component.
 *
 * @deprecated Use `NavMenuLinkEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuLinkEmits = {
  /**
   * Emitted when select occurs.
   */
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};

/**
 * Properties for the NavigationMenuIndicator component.
 *
 * @deprecated The `NavigationMenu` family is superseded by `NavMenu`.; `NavMenu` has no indicator concept. Will be removed in v1.0.
 */
export interface NavigationMenuIndicatorProps extends ForceMountProps, BaseProps {}

/**
 * Properties for the NavigationMenuSub component.
 *
 * @deprecated Sub navigation is modeled by `NavMenuSubTrigger` / `NavMenuSubContent`. Will be removed in v1.0.
 */
export interface NavigationMenuSubProps extends BaseProps {
  /**
   * Current model value.
   */
  modelValue?: string;
  /**
   * Default value.
   */
  defaultValue?: string;
}
/**
 * Events for the NavigationMenuSub component.
 *
 * @deprecated Sub navigation is modeled by `NavMenuSubTrigger` / `NavMenuSubContent`. Will be removed in v1.0.
 */
export type NavigationMenuSubEmits = NavigationMenuRootEmits;

/**
 * Type information for MotionAttribute.
 *
 * @deprecated The `NavigationMenu` family is superseded by `NavMenu`.. Will be removed in v1.0.
 */
export type MotionAttribute = 'to-start' | 'to-end' | 'from-start' | 'from-end';

/**
 * Type information for NavigationMenuViewportPosition.
 *
 * @deprecated The `NavigationMenu` family is superseded by `NavMenu`.. Will be removed in v1.0.
 */
export interface NavigationMenuViewportPosition {
  /**
   * Left.
   */
  left: number;
  /**
   * Top.
   */
  top: number;
}

/**
 * Parameters used to create the NavigationMenuRoot context.
 *
 * @deprecated Use `NavMenuRootContextParams` instead. Will be removed in v1.0.
 */
export interface NavigationMenuRootContextParams extends ToContext<
  Required<NavigationMenuRootProps>,
  | 'dir'
  | 'orientation'
  | 'unmountOnHide'
  | 'skipDelayDuration'
  | 'delayDuration'
  | 'disableClickTrigger'
  | 'disableHoverTrigger'
  | 'disablePointerLeaveClose'
> {
  /**
   * Whether this context is the root.
   */
  isRoot: boolean;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
}

/**
 * Parameters used to create the NavigationMenuItem context.
 *
 * @deprecated Use `NavMenuItemContextParams` instead. Will be removed in v1.0.
 */
export interface NavigationMenuItemContextParams {
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
  /**
   * Content id used by the component context.
   */
  contentId: string;
  /**
   * Trigger id used by the component context.
   */
  triggerId: string;
  /**
   * Callback invoked when the entry key down event fires.
   */
  onEntryKeyDown: () => void;
  /**
   * Callback invoked when the focus proxy enter event fires.
   */
  onFocusProxyEnter: (side?: Exclude<Align, 'center'>) => void;
  /**
   * Callback invoked when the content focus outside event fires.
   */
  onContentFocusOutside: () => void;
  /**
   * Callback invoked when the root content close event fires.
   */
  onRootContentClose: () => void;
}

/**
 * Available UI slots for the NavigationMenu component.
 *
 * @deprecated Use `NavMenuUiSlot` instead. Will be removed in v1.0.
 */
export type NavigationMenuUiSlot =
  | 'root'
  | 'trigger'
  | 'content'
  | 'list'
  | 'indicator'
  | 'viewport'
  | 'item'
  | 'itemIcon'
  | 'link'
  | 'subList'
  | 'subItem'
  | 'subLink'
  | 'triggerIcon'
  | 'linkIcon'
  | 'arrow'
  | 'subItemContent'
  | 'subLinkContent'
  | 'subLinkLabel'
  | 'subLinkDescription';

/**
 * UI class overrides for the NavigationMenu component.
 *
 * @deprecated Use `NavMenuUi` instead. Will be removed in v1.0.
 */
export type NavigationMenuUi = UiClass<NavigationMenuUiSlot>;

/**
 * Option data for the NavigationMenu component.
 *
 * @deprecated Use `NavMenuOptionData` instead. Will be removed in v1.0.
 */
export interface NavigationMenuOptionData extends LinkBaseProps {
  /** The value of the option. */
  value: string;
  /** The label to display in the option. */
  label: string;
  /** The description of the option. */
  description?: string;
  /**
   * The icon of the option.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: IconValue;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** The children of the option. */
  children?: NavigationMenuOptionData[];
}

/**
 * Properties for the NavigationMenuSubCompact component.
 *
 * @deprecated Use `NavMenuSubOptionCompactProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuSubOptionCompactProps {
  /**
   * Sub item.
   */
  subItem: NavigationMenuOptionData;
  /**
   * Properties forwarded to the sub item element.
   */
  subItemProps?: NavigationMenuItemProps;
  /**
   * Properties forwarded to the link element.
   */
  linkProps?: Omit<NavigationMenuLinkProps, LinkBasePropsKey>;
}

/**
 * Events for the NavigationMenuSubOptionCompact component.
 *
 * @deprecated Use `NavMenuSubOptionCompactEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuSubOptionCompactEmits = NavigationMenuLinkEmits;

/**
 * Slots for the NavigationMenuSubOptionCompact component.
 *
 * @deprecated Use `NavMenuSubOptionCompactSlots` instead. Will be removed in v1.0.
 */
export type NavigationMenuSubOptionCompactSlots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
  'item-children': (props: { item: NavigationMenuOptionData }) => any;
};

/**
 * Properties for the NavigationMenuCompact component.
 *
 * @deprecated Use `NavMenuOptionCompactProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuOptionCompactProps {
  /**
   * Current item data.
   */
  item: NavigationMenuOptionData;
  /**
   * Properties forwarded to the item element.
   */
  itemProps?: NavigationMenuItemProps;
  /**
   * Properties forwarded to the link element.
   */
  linkProps?: Omit<NavigationMenuLinkProps, LinkBasePropsKey>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: NavigationMenuTriggerProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: NavigationMenuContentProps;
  /**
   * Properties forwarded to the viewport element.
   */
  viewportProps?: NavigationMenuViewportProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: NavigationMenuIndicatorProps;
  /**
   * Properties forwarded to the list element.
   */
  listProps?: NavigationMenuListProps;
  /**
   * Properties forwarded to the sub list element.
   */
  subListProps?: NavigationMenuListProps;
  /**
   * Properties forwarded to the sub item element.
   */
  subItemProps?: NavigationMenuItemProps;
}

/**
 * Events for the NavigationMenuOptionCompact component.
 *
 * @deprecated Use `NavMenuOptionCompactEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuOptionCompactEmits = NavigationMenuSubEmits &
  NavigationMenuContentEmits &
  NavigationMenuLinkEmits;

/**
 * Slots for the NavigationMenuOptionCompact component.
 *
 * @deprecated Use `NavMenuOptionCompactSlots` instead. Will be removed in v1.0.
 */
export type NavigationMenuOptionCompactSlots = NavigationMenuSubOptionCompactSlots & {
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
};

/**
 * Properties for the NavigationMenuCompact component.
 *
 * @deprecated Use `NavMenuCompactProps` instead. Will be removed in v1.0.
 */
export interface NavigationMenuCompactProps
  extends NavigationMenuRootProps, Omit<NavigationMenuOptionCompactProps, 'item'> {
  /** The items to render in the navigation menu. */
  items: NavigationMenuOptionData[];
}

/**
 * Events for the NavigationMenuCompact component.
 *
 * @deprecated Use `NavMenuCompactEmits` instead. Will be removed in v1.0.
 */
export type NavigationMenuCompactEmits = NavigationMenuRootEmits & NavigationMenuOptionCompactEmits;

/**
 * Slots for the NavigationMenuCompact component.
 *
 * @deprecated Use `NavMenuCompactSlots` instead. Will be removed in v1.0.
 */
export type NavigationMenuCompactSlots = NavigationMenuOptionCompactSlots;
