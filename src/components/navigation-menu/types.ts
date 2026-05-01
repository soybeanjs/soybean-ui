import type {
  ClassValue,
  LinkBaseProps,
  NavigationMenuContentEmits,
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkEmits,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuRootEmits,
  NavigationMenuRootProps,
  NavigationMenuSubEmits,
  NavigationMenuTriggerProps,
  NavigationMenuUi,
  NavigationMenuViewportProps,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';

/**
 * Option data for the navigation menu component.
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
 * Additional UI slots for the navigation menu component.
 */
export type NavigationMenuExtraUiSlot =
  | 'triggerIcon'
  | 'linkIcon'
  | 'arrow'
  | 'viewportRoot'
  | 'subItemContent'
  | 'subLinkContent'
  | 'subLinkLabel'
  | 'subLinkDescription';

/**
 * UI class overrides for the navigation menu component.
 */
export type NavigationMenuExtraUi = UiClass<NavigationMenuExtraUiSlot>;

/**
 * Extended UI class overrides for the navigation menu component.
 */
export type NavigationMenuExtendedUi = NavigationMenuUi & NavigationMenuExtraUi;

/**
 * Props for the navigation menu sub option component.
 */
export interface NavigationMenuSubOptionProps {
  /**
   * Sub item.
   */
  subItem: NavigationMenuOptionData;
  /**
   * Props forwarded to the sub item element.
   */
  subItemProps?: NavigationMenuItemProps;
  /**
   * Props forwarded to the link element.
   */
  linkProps?: NavigationMenuLinkProps;
}

/**
 * Emits for the navigation menu sub option component.
 */
export type NavigationMenuSubOptionEmits = NavigationMenuLinkEmits;

/**
 * Props for the navigation menu option component.
 */
export interface NavigationMenuOptionProps {
  /**
   * Current item data.
   */
  item: NavigationMenuOptionData;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: NavigationMenuItemProps;
  /**
   * Props forwarded to the link element.
   */
  linkProps?: NavigationMenuLinkProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: NavigationMenuTriggerProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: NavigationMenuContentProps;
  /**
   * Props forwarded to the viewport element.
   */
  viewportProps?: NavigationMenuViewportProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: NavigationMenuIndicatorProps;
  /**
   * Props forwarded to the list element.
   */
  listProps?: NavigationMenuListProps;
  /**
   * Props forwarded to the sub list element.
   */
  subListProps?: NavigationMenuListProps;
  /**
   * Props forwarded to the sub item element.
   */
  subItemProps?: NavigationMenuItemProps;
}

/**
 * Emits for the navigation menu option component.
 */
export type NavigationMenuOptionEmits = NavigationMenuSubEmits & NavigationMenuContentEmits & NavigationMenuLinkEmits;

/**
 * Props for the navigation menu component.
 */
export interface NavigationMenuProps extends NavigationMenuRootProps, Omit<NavigationMenuOptionProps, 'item'> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<NavigationMenuExtendedUi>;
  /**
   * Items rendered by the component.
   */
  items: NavigationMenuOptionData[];
}

/**
 * Emits for the navigation menu component.
 */
export type NavigationMenuEmits = NavigationMenuRootEmits & NavigationMenuOptionEmits;
