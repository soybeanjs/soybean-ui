import type { ComputedRef } from 'vue';
import type { BaseProps, ClassValue, HorizontalSide, PropsToContext, UiClass } from '@soybeanjs/headless/types';
import type { AsTag } from '@soybeanjs/headless/primitive';
import type { LinkBaseProps, LinkProps } from '@soybeanjs/headless/link';
import type {
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
  TreeMenuUiSlot
} from '@soybeanjs/headless/tree-menu';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';
import type { TooltipProps } from '../tooltip/types';
import type { BadgeProps } from '../badge/types';
import type { TagProps } from '../tag/types';
import type { MenuOptionData } from '../menu';
import type { DropdownMenuProps } from '../dropdown-menu/types';

/**
 * Option data for the TreeMenuBase component.
 */
export interface TreeMenuBaseOptionData extends TreeMenuBaseItemProps, LinkBaseProps {
  /**
   * Whether the option is a group. only the first-level options can be groups.
   */
  isGroup?: boolean;
  /**
   * The label of the option.
   */
  label: string;
  /**
   * The icon of the option.
   */
  icon?: IconValue;
  /**
   * Whether the option is hidden.
   */
  hidden?: boolean;
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
}

/**
 * Option data for the TreeMenu component.
 */
export type TreeMenuOptionData<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = T & {
  /**
   * The children of the option.
   */
  children?: TreeMenuOptionData<T>[];
};

/**
 * Slot properties for the TreeMenuOption component.
 */
export interface TreeMenuOptionSlotProps extends TreeMenuOptionProps {
  /**
   * Whether to show the link icon.
   */
  showLinkIcon?: boolean;
}

/**
 * Properties for the TreeMenuOption component.
 */
export interface TreeMenuOptionProps {
  /**
   * Rendered element tag.
   */
  as?: AsTag;
  /**
   * Current item data.
   */
  item: TreeMenuOptionData;
  /**
   * Properties forwarded to the item element.
   */
  itemProps?: TreeMenuItemProps;
  /**
   * Properties forwarded to the button element.
   */
  buttonProps?: TreeMenuButtonProps;
  /**
   * Properties forwarded to the link element.
   */
  linkProps?: LinkProps;
  /**
   * Properties forwarded to the collapsible element.
   */
  collapsibleProps?: TreeMenuCollapsibleProps;
  /**
   * Properties forwarded to the sub element.
   */
  subProps?: TreeMenuSubProps;
}

/**
 * Events for the TreeMenuOption component.
 */
export type TreeMenuOptionEmits = {
  /**
   * Emitted when select dropdown occurs.
   */
  selectDropdown: [value: string];
};

/**
 * Properties for the TreeMenuOptions component.
 */
export interface TreeMenuOptionsProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> extends Omit<
  TreeMenuOptionProps,
  'as' | 'item'
> {
  /**
   * Items rendered by the component.
   */
  items: TreeMenuOptionData<T>[];
  /**
   * Properties forwarded to the group root element.
   */
  groupRootProps?: TreeMenuGroupRootProps;
  /**
   * Properties forwarded to the group element.
   */
  groupProps?: TreeMenuGroupProps;
  /**
   * Properties forwarded to the group label element.
   */
  groupLabelProps?: TreeMenuGroupLabelProps;
  /**
   * Whether to show the group icon.
   *
   * @default false
   */
  showGroupIcon?: boolean;
}

/**
 * Events for the TreeMenuOptions component.
 */
export type TreeMenuOptionsEmits = TreeMenuOptionEmits;

/**
 * Additional UI slots for the tree menu component.
 */
export type TreeMenuExtraUiSlot =
  | 'itemLabel'
  | 'itemAbsolute'
  | 'itemBadge'
  | 'itemTag'
  | 'itemAction'
  | 'itemLinkIcon'
  | 'collapsibleIcon';

/**
 * Extended UI class overrides for the TreeMenu component.
 */
export type TreeMenuExtendedUi = UiClass<TreeMenuUiSlot | TreeMenuExtraUiSlot>;

/**
 * Properties for the TreeMenu component.
 */
export interface TreeMenuProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData>
  extends TreeMenuRootProps, TreeMenuOptionsProps<T> {
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
  ui?: Partial<TreeMenuExtendedUi>;
  /**
   * The side of the tree menu.
   *
   * @default 'left'
   */
  side?: HorizontalSide;
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
}

/**
 * Events for the TreeMenu component.
 */
export type TreeMenuEmits = TreeMenuRootEmits & TreeMenuOptionEmits;

/**
 * Properties for the TreeMenuStyledItem component.
 */
export interface TreeMenuStyledItemProps extends BaseProps {
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
  ui?: Partial<Pick<TreeMenuExtendedUi, 'item' | 'button'>>;
}

/**
 * Context for the TreeMenu component.
 */
export interface TreeMenuContext extends PropsToContext<TreeMenuProps, 'size' | 'side'> {}

/**
 * Context for the TreeMenuOptions component.
 */
export interface TreeMenuOptionsContext {
  /**
   * Active paths tracked by the component context.
   */
  activePaths: ComputedRef<string[]>;
}
