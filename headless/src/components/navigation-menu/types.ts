import type { HTMLAttributes, ShallowRef } from 'vue';
import type {
  Align,
  DataOrientation,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  PropsToContext,
  UiClass
} from '../../types';
import type { LinkProps, LinkBaseProps } from '../link/types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the navigation menu root component.
 */
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
 * Events for the navigation menu root component.
 */
export type NavigationMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the navigation menu viewport component.
 */
export interface NavigationMenuViewportProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Align.
   */
  align?: Align;
}

/**
 * Properties for the navigation menu content impl component.
 */
export interface NavigationMenuContentImplProps extends DismissableLayerProps, /** @vue-ignore */ HTMLAttributes {}
/**
 * Events for the navigation menu content impl component.
 */
export type NavigationMenuContentImplEmits = DismissableLayerEmits;

/**
 * Properties for the navigation menu content component.
 */
export interface NavigationMenuContentProps extends NavigationMenuContentImplProps, ForceMountProps {}
/**
 * Events for the navigation menu content component.
 */
export type NavigationMenuContentEmits = NavigationMenuContentImplEmits;

/**
 * Properties for the navigation menu trigger component.
 */
export interface NavigationMenuTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the navigation menu list component.
 */
export interface NavigationMenuListProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the navigation menu sub list component.
 */
export interface NavigationMenuSubListProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the navigation menu item component.
 */
export interface NavigationMenuItemProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Value associated with the current item.
   */
  value?: string;
}

/**
 * Properties for the navigation menu link component.
 */
export interface NavigationMenuLinkProps extends Omit<LinkProps, 'onSelect'> {
  /** Used to identify the link as the currently active page. */
  active?: boolean;
}

/**
 * Events for the navigation menu link component.
 */
export type NavigationMenuLinkEmits = {
  /**
   * Emitted when select occurs.
   */
  select: [payload: CustomEvent<{ originalEvent: Event }>];
};

/**
 * Properties for the navigation menu indicator component.
 */
export interface NavigationMenuIndicatorProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the navigation menu sub component.
 */
export interface NavigationMenuSubProps extends /** @vue-ignore */ HTMLAttributes {
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
 * Events for the navigation menu sub component.
 */
export type NavigationMenuSubEmits = NavigationMenuRootEmits;

/**
 * Type information for the motion attribute component.
 */
export type MotionAttribute = 'to-start' | 'to-end' | 'from-start' | 'from-end';

/**
 * Type information for the navigation menu viewport position component.
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
 * Parameters used to create the navigation menu root context.
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
 * Parameters used to create the navigation menu item context.
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
 * Available UI slots for the navigation menu component.
 */
export type NavigationMenuUiSlot =
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

/**
 * UI class overrides for the navigation menu component.
 */
export type NavigationMenuUi = UiClass<NavigationMenuUiSlot>;

/**
 * Type information for the navigation menu item data component.
 */
export interface NavigationMenuItemData extends LinkBaseProps {
  /** The value of the item. */
  value: string;
  /** The label to display in the item. */
  label: string;
  /** The description of the item. */
  description?: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** The children of the item. */
  children?: NavigationMenuItemData[];
}

/**
 * Properties for the navigation menu compact component.
 */
export interface NavigationMenuCompactProps extends NavigationMenuRootProps {
  /** The items to render in the navigation menu. */
  items: NavigationMenuItemData[];
  /** Properties for each NavigationMenuItem. */
  itemProps?: NavigationMenuItemProps;
  /** Properties for NavigationMenuLink. */
  linkProps?: NavigationMenuLinkProps;
  /** Properties for NavigationMenuTrigger. */
  triggerProps?: NavigationMenuTriggerProps;
  /** Properties for NavigationMenuContent. */
  contentProps?: NavigationMenuContentProps;
  /** Properties for NavigationMenuList. */
  listProps?: NavigationMenuListProps;
  /** Properties for NavigationMenuSubList. */
  subListProps?: NavigationMenuListProps;
  /** Properties for sub-items. */
  subItemProps?: NavigationMenuItemProps;
  /** Properties for NavigationMenuViewport. */
  viewportProps?: NavigationMenuViewportProps;
  /** Properties for NavigationMenuIndicator. */
  indicatorProps?: NavigationMenuIndicatorProps;
}

/**
 * Events for the navigation menu compact component.
 */
export type NavigationMenuCompactEmits = NavigationMenuRootEmits & NavigationMenuLinkEmits & NavigationMenuContentEmits;

/**
 * Slots for the navigation menu compact component.
 */
export interface NavigationMenuCompactSlots {
  /** Slot for rendering the entire item (for top-level items). */
  item?: (props: { item: NavigationMenuItemData; isTrigger?: boolean }) => any;
  /** Slot for rendering leading content of an item. */
  'item-leading'?: (props: { item: NavigationMenuItemData }) => any;
  /** Slot for rendering trailing content of an item. */
  'item-trailing'?: (props: { item: NavigationMenuItemData }) => any;
  /** Slot for rendering trigger icon (chevron down by default). */
  'item-trigger-icon'?: (props: { item: NavigationMenuItemData }) => any;
  /** Slot for rendering link icon (arrow up right by default for external links). */
  'item-link-icon'?: (props: { item: NavigationMenuItemData }) => any;
  /** Slot for rendering custom children content. */
  'item-children'?: (props: { item: NavigationMenuItemData }) => any;
  /** Slot for rendering indicator arrow. */
  indicator?: () => any;
}
