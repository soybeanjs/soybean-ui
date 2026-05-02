import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue, HorizontalSide, PropsToContext, UiClass } from '@soybeanjs/headless/types';
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
 * Option data for the tree menu component.
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
 * Option data for the tree menu component.
 */
export type TreeMenuOptionData<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = T & {
  /**
   * The children of the option.
   */
  children?: TreeMenuOptionData<T>[];
};

/**
 * Slot props for the tree menu component.
 */
export interface TreeMenuOptionSlotProps extends TreeMenuOptionProps {
  /**
   * Whether to show the link icon.
   */
  showLinkIcon?: boolean;
}

/**
 * Props for the tree menu option component.
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
   * Props forwarded to the item element.
   */
  itemProps?: TreeMenuItemProps;
  /**
   * Props forwarded to the button element.
   */
  buttonProps?: TreeMenuButtonProps;
  /**
   * Props forwarded to the link element.
   */
  linkProps?: LinkProps;
  /**
   * Props forwarded to the collapsible element.
   */
  collapsibleProps?: TreeMenuCollapsibleProps;
  /**
   * Props forwarded to the sub element.
   */
  subProps?: TreeMenuSubProps;
}

/**
 * Emits for the tree menu option component.
 */
export type TreeMenuOptionEmits = {
  /**
   * Emitted when select dropdown occurs.
   */
  selectDropdown: [value: string];
};

/**
 * Props for the tree menu options component.
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
   * Props forwarded to the group root element.
   */
  groupRootProps?: TreeMenuGroupRootProps;
  /**
   * Props forwarded to the group element.
   */
  groupProps?: TreeMenuGroupProps;
  /**
   * Props forwarded to the group label element.
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
 * Emits for the tree menu options component.
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
 * Extended UI class overrides for the tree menu component.
 */
export type TreeMenuExtendedUi = UiClass<TreeMenuUiSlot | TreeMenuExtraUiSlot>;

/**
 * Props for the tree menu component.
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
 * Emits for the tree menu component.
 */
export type TreeMenuEmits = TreeMenuRootEmits & TreeMenuOptionEmits;

/**
 * Props for the tree menu styled item component.
 */
export interface TreeMenuStyledItemProps extends /** @vue-ignore */ HTMLAttributes {
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
 * Context for the tree menu component.
 */
export interface TreeMenuContext extends PropsToContext<TreeMenuProps, 'size' | 'side'> {}

/**
 * Context for the tree menu options component.
 */
export interface TreeMenuOptionsContext {
  /**
   * Active paths tracked by the component context.
   */
  activePaths: ComputedRef<string[]>;
}
