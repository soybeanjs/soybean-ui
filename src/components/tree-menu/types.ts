import type { HTMLAttributes } from 'vue';
import type {
  AsTag,
  ClassValue,
  HorizontalSide,
  LinkBaseProps,
  LinkProps,
  PropsToContext,
  TreeMenuBaseItemProps,
  TreeMenuButtonProps,
  TreeMenuCollapsibleProps,
  TreeMenuGroupLabelProps,
  TreeMenuGroupProps,
  TreeMenuGroupRootProps,
  TreeMenuItemProps,
  TreeMenuRootEmits,
  TreeMenuRootProps,
  TreeMenuSubProps,
  TreeMenuUiSlot,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';
import type { TooltipProps } from '../tooltip/types';
import type { BadgeProps } from '../badge/types';
import type { TagProps } from '../tag/types';
import type { MenuOptionData } from '../menu/types';
import type { DropdownMenuProps } from '../dropdown-menu/types';

export interface TreeMenuBaseOptionData extends TreeMenuBaseItemProps, LinkBaseProps {
  /**
   * The label of the option.
   */
  label: string;
  /**
   * The icon of the option.
   */
  icon?: IconValue;
  /**
   * The badge of the option.
   */
  badge?: string;
  /**
   * The badge props of the option.
   */
  badgeProps?: Omit<BadgeProps, 'content'>;
  /**
   * The tag of the option.
   */
  tag?: string;
  /**
   * The tag props of the option.
   */
  tagProps?: Omit<TagProps, 'content'>;
  /**
   * The tooltip props of the option.
   */
  tooltipProps?: TooltipProps;
  /**
   * The dropdown menu props of the option.
   */
  dropdownMenuProps?: Omit<DropdownMenuProps, 'items'>;
  /**
   * The actions of the option.
   */
  actions?: MenuOptionData[];
  /**
   * The action menu props of the option.
   */
  actionMenuProps?: Omit<DropdownMenuProps, 'items'>;
  /**
   * The callback function when an action is selected.
   */
  onActionSelect?: (action: MenuOptionData) => void;
  /**
   * The children of the option.
   */
  children?: TreeMenuBaseOptionData[];
}

export type TreeMenuGroupOptionData<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = T & {
  isGroup: true;
  children: T[];
};

export type TreeMenuOptionData<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> =
  | T
  | TreeMenuGroupOptionData<T>;

export interface TreeMenuOptionProps {
  as?: AsTag;
  item: TreeMenuBaseOptionData;
  itemProps?: TreeMenuItemProps;
  buttonProps?: TreeMenuButtonProps;
  linkProps?: LinkProps;
  collapsibleProps?: TreeMenuCollapsibleProps;
  subProps?: TreeMenuSubProps;
}

export type TreeMenuExtraUiSlot =
  | 'itemLabel'
  | 'itemAbsolute'
  | 'itemBadge'
  | 'itemTag'
  | 'itemAction'
  | 'itemLinkIcon'
  | 'collapsibleIcon';

export type TreeMenuExtendedUi = UiClass<TreeMenuUiSlot | TreeMenuExtraUiSlot>;

export interface TreeMenuProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData>
  extends TreeMenuRootProps, Omit<TreeMenuOptionProps, 'as' | 'item'> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TreeMenuExtendedUi>;
  /**
   * The side of the tree menu.
   *
   * @default 'left'
   */
  side?: HorizontalSide;
  items?: TreeMenuOptionData<T>[];
  /**
   * The width of the sidebar menu when it's collapsed.
   *
   * @default 50
   */
  collapsedWidth?: number;
  /**
   * The width of the indent.
   *
   * @default 16
   */
  indent?: number;
  /**
   * Whether to show the group icon.
   *
   * @default false
   */
  showGroupIcon?: boolean;
  groupRootProps?: TreeMenuGroupRootProps;
  groupProps?: TreeMenuGroupProps;
  groupLabelProps?: TreeMenuGroupLabelProps;
}

export interface TreeMenuOptionSlotProps extends TreeMenuOptionProps {
  showLinkIcon?: boolean;
}

export type TreeMenuItemEmits = {
  selectDropdown: [value: string];
};

export interface TreeMenuStyledItemProps extends /** @vue-ignore */ HTMLAttributes {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<Pick<TreeMenuExtendedUi, 'item' | 'button'>>;
}

export interface TreeMenuContextParams extends PropsToContext<TreeMenuProps, 'size' | 'side'> {}

export type TreeMenuEmits = TreeMenuRootEmits & TreeMenuItemEmits;
