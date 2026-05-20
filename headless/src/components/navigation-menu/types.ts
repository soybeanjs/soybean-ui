import type { ShallowRef } from 'vue';
import type {
  BaseProps,
  Align,
  DataOrientation,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  PropsToContext,
  UiClass
} from '../../types';
import type { IconValue } from '../_icon/types';
import type { LinkProps, LinkBaseProps } from '../link/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the NavigationMenuRoot component.
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
 */
export type NavigationMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the NavigationMenuViewport component.
 */
export interface NavigationMenuViewportProps extends ForceMountProps, BaseProps {
  /**
   * Align.
   */
  align?: Align;
}

/**
 * Properties for the NavigationMenuContentImpl component.
 */
export interface NavigationMenuContentImplProps extends DismissableLayerProps, BaseProps {}
/**
 * Events for the NavigationMenuContentImpl component.
 */
export type NavigationMenuContentImplEmits = DismissableLayerEmits;

/**
 * Properties for the NavigationMenuContent component.
 */
export interface NavigationMenuContentProps extends NavigationMenuContentImplProps, ForceMountProps {}
/**
 * Events for the NavigationMenuContent component.
 */
export type NavigationMenuContentEmits = NavigationMenuContentImplEmits;

/**
 * Properties for the NavigationMenuTrigger component.
 */
export interface NavigationMenuTriggerProps extends PrimitiveWithBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the NavigationMenuList component.
 */
export interface NavigationMenuListProps extends BaseProps {}

/**
 * Properties for the NavigationMenuSubList component.
 */
export interface NavigationMenuSubListProps extends BaseProps {}

/**
 * Properties for the NavigationMenuItem component.
 */
export interface NavigationMenuItemProps extends BaseProps {
  /**
   * Value associated with the current item.
   */
  value?: string;
}

/**
 * Properties for the NavigationMenuLink component.
 */
export interface NavigationMenuLinkProps extends Omit<LinkProps, 'onSelect'> {
  /** Used to identify the link as the currently active page. */
  active?: boolean;
}

/**
 * Events for the NavigationMenuLink component.
 */
export type NavigationMenuLinkEmits = {
  /**
   * Emitted when select occurs.
   */
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};

/**
 * Properties for the NavigationMenuIndicator component.
 */
export interface NavigationMenuIndicatorProps extends ForceMountProps, BaseProps {}

/**
 * Properties for the NavigationMenuSub component.
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
 */
export type NavigationMenuSubEmits = NavigationMenuRootEmits;

/**
 * Type information for MotionAttribute.
 */
export type MotionAttribute = 'to-start' | 'to-end' | 'from-start' | 'from-end';

/**
 * Type information for NavigationMenuViewportPosition.
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
 */
export interface NavigationMenuRootContextParams extends PropsToContext<
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
 */
export type NavigationMenuUi = UiClass<NavigationMenuUiSlot>;

/**
 * Option data for the NavigationMenu component.
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
  linkProps?: NavigationMenuLinkProps;
}

/**
 * Events for the NavigationMenuSubOptionCompact component.
 */
export type NavigationMenuSubOptionCompactEmits = NavigationMenuLinkEmits;

/**
 * Slots for the NavigationMenuSubOptionCompact component.
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
  linkProps?: NavigationMenuLinkProps;
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
 */
export type NavigationMenuOptionCompactEmits = NavigationMenuSubEmits &
  NavigationMenuContentEmits &
  NavigationMenuLinkEmits;

/**
 * Slots for the NavigationMenuOptionCompact component.
 */
export type NavigationMenuOptionCompactSlots = NavigationMenuSubOptionCompactSlots & {
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
};

/**
 * Properties for the NavigationMenuCompact component.
 */
export interface NavigationMenuCompactProps
  extends NavigationMenuRootProps, Omit<NavigationMenuOptionCompactProps, 'item'> {
  /** The items to render in the navigation menu. */
  items: NavigationMenuOptionData[];
}

/**
 * Events for the NavigationMenuCompact component.
 */
export type NavigationMenuCompactEmits = NavigationMenuRootEmits & NavigationMenuOptionCompactEmits;

/**
 * Slots for the NavigationMenuCompact component.
 */
export type NavigationMenuCompactSlots = NavigationMenuOptionCompactSlots;
