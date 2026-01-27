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

export type NavigationMenuExtraUiSlot =
  | 'triggerIcon'
  | 'linkIcon'
  | 'arrow'
  | 'viewportRoot'
  | 'subItemContent'
  | 'subLinkContent'
  | 'subLinkLabel'
  | 'subLinkDescription';

export type NavigationMenuExtraUi = UiClass<NavigationMenuExtraUiSlot>;

export type NavigationMenuExtendedUi = NavigationMenuUi & NavigationMenuExtraUi;

export interface NavigationMenuSubOptionProps {
  subItem: NavigationMenuOptionData;
  subItemProps?: NavigationMenuItemProps;
  linkProps?: NavigationMenuLinkProps;
}

export type NavigationMenuSubOptionEmits = NavigationMenuLinkEmits;

export interface NavigationMenuOptionProps {
  item: NavigationMenuOptionData;
  itemProps?: NavigationMenuItemProps;
  linkProps?: NavigationMenuLinkProps;
  triggerProps?: NavigationMenuTriggerProps;
  contentProps?: NavigationMenuContentProps;
  viewportProps?: NavigationMenuViewportProps;
  indicatorProps?: NavigationMenuIndicatorProps;
  listProps?: NavigationMenuListProps;
  subListProps?: NavigationMenuListProps;
  subItemProps?: NavigationMenuItemProps;
}

export type NavigationMenuOptionEmits = NavigationMenuSubEmits & NavigationMenuContentEmits & NavigationMenuLinkEmits;

export interface NavigationMenuProps extends NavigationMenuRootProps, Omit<NavigationMenuOptionProps, 'item'> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<NavigationMenuExtendedUi>;
  items: NavigationMenuOptionData[];
}

export type NavigationMenuEmits = NavigationMenuRootEmits & NavigationMenuOptionEmits;
