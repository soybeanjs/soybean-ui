import type { ComputedRef, ShallowRef } from 'vue';
import type { ClassValue, LinkProps, TreeItemEmits, TreeItemProps, TreeRootEmits, TreeRootProps } from '@headless';
import type { ThemeSize } from '@theme';
import type { IconValue } from '../icon/types';
import type { TooltipProps } from '../tooltip/types';
import type { BadgeProps } from '../badge/types';
import type { TagProps } from '../tag/types';
import type { MenuOptionData } from '../menu/types';
import type { DropdownMenuProps } from '../dropdown-menu/types';

export type TreeMenuState = 'expanded' | 'collapsed';

export interface TreeMenuBaseOptionData {
  label: string;
  value: string;
  icon?: IconValue;
  disabled?: boolean;
  to?: LinkProps['to'];
  href?: LinkProps['href'];
  linkProps?: LinkProps;
  badge?: string;
  badgeProps?: BadgeProps;
  tag?: string;
  tagProps?: TagProps;
  actions?: MenuOptionData[];
  onActionSelect?: (action: MenuOptionData) => void;
  children?: TreeMenuBaseOptionData[];
}

export interface TreeMenuGroupOptionData extends TreeMenuBaseOptionData {
  isGroup: true;
}

export type TreeMenuOptionData = TreeMenuBaseOptionData | TreeMenuGroupOptionData;

export type TreeMenuThemeSlot =
  | 'root'
  | 'groupLabel'
  | 'item'
  | 'itemLabel'
  | 'itemLinkIcon'
  | 'collapsibleIcon'
  | 'itemBadge'
  | 'itemTag'
  | 'itemAction';

export type TreeMenuUi = Partial<Record<TreeMenuThemeSlot, ClassValue>>;

export interface TreeMenuItemImplProps extends TreeItemProps, TreeMenuBaseOptionData {
  actionMenuProps?: Omit<DropdownMenuProps, 'items'>;
}

export type TreeMenuItemImplEmits = TreeItemEmits;

export interface TreeMenuItemProps extends TreeMenuItemImplProps {
  tooltipProps?: TooltipProps;
  dropdownMenuProps?: Omit<DropdownMenuProps, 'items'>;
}

export type TreeMenuItemEmits = TreeItemEmits & {
  selectDropdown: [value: string];
};

export interface TreeMenuProps<T extends TreeMenuOptionData = TreeMenuOptionData>
  extends TreeRootProps<T, string, false> {
  size?: ThemeSize;
  ui?: TreeMenuUi;
  /**
   * Whether the sidebar menu is collapsed.
   *
   * @default false
   */
  collapsed?: boolean;
  /**
   * The value of the sidebar menu when it's collapsed.
   */
  defaultCollapsed?: boolean;
  /**
   * The width of the sidebar menu when it's collapsed.
   *
   * @default 50
   */
  collapsedWidth?: number;
  tooltipProps?: TooltipProps;
  dropdownMenuProps?: Omit<DropdownMenuProps, 'items'>;
  badgeProps?: Omit<BadgeProps, 'content'>;
  tagProps?: Omit<TagProps, 'content'>;
  actionMenuProps?: Omit<DropdownMenuProps, 'items'>;
}

export type TreeMenuEmits = TreeRootEmits<false> & {
  'update:collapsed': [value: boolean];
};

export interface TreeMenuContextParams {
  collapsed: ShallowRef<boolean | undefined>;
  size?: ComputedRef<ThemeSize>;
}

export interface TreeMenuThemeContextParams {
  ui: ComputedRef<Record<TreeMenuThemeSlot, ClassValue>>;
}
