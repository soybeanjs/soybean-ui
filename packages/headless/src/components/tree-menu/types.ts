import type { ComputedRef, ShallowRef } from 'vue';
import type { BaseProps, HorizontalSide, UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
import type { BadgeCompactProps } from '../badge/types';
import type { ButtonProps } from '../button/types';
import type { DropdownMenuCompactProps } from '../dropdown-menu/types';
import type { LinkProps, LinkBaseProps } from '../link/types';
import type { MenuOptionData } from '../menu/types';
import type { AsTag, PrimitiveWithBaseProps } from '../primitive/types';
import type { TooltipCompactProps } from '../tooltip/types';

/**
 * State values for TreeMenuCollapsedState.
 */
export type TreeMenuCollapsedState = 'expanded' | 'collapsed';

/**
 * Properties for the TreeMenuRoot component.
 */
export interface TreeMenuRootProps {
  /**
   * the active value of the tree menu. can be bound-with with `v-model`.
   */
  modelValue?: string;
  /**
   * the value of the tree menu when initially rendered. use when you do not need to control the state of the tree.
   */
  defaultValue?: string;
  /**
   * the expanded value of the tree menu. can be bound-with with `v-model`.
   */
  expanded?: string[];
  /**
   * the expanded value of the tree menu when initially rendered. use when you do not need to control the state of the tree.
   */
  defaultExpanded?: string[];
  /**
   * Whether the tree menu is collapsed.
   *
   * @default false
   */
  collapsed?: boolean;
  /**
   * The value of the tree menu when it's collapsed.
   */
  defaultCollapsed?: boolean;
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
   * The function to convert pixels to rem.
   *
   * @param px - The width in pixels
   * @default (px: number) => px / 16 (16 is the base font size)
   * @returns The width in rem
   */
  pxToRem?: (px: number) => number;
}

/**
 * Events for the TreeMenuRoot component.
 */
export type TreeMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the expanded state changes.
   */
  'update:expanded': [value: string[]];
  /**
   * Emitted when the collapsed state changes.
   */
  'update:collapsed': [value: boolean];
};

/**
 * Properties for the TreeMenuGroupRoot component.
 */
export interface TreeMenuGroupRootProps extends BaseProps {}

/**
 * Properties for the TreeMenuGroup component.
 */
export interface TreeMenuGroupProps extends PrimitiveWithBaseProps {}

/**
 * Properties for the TreeMenuGroupLabel component.
 */
export interface TreeMenuGroupLabelProps extends BaseProps {}

/**
 * Properties for the TreeMenuBaseItem component.
 */
export interface TreeMenuBaseItemProps {
  /**
   * The unique value of the item.
   */
  value: string;
  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: boolean;
}

/**
 * Properties for the TreeMenuItem component.
 */
export interface TreeMenuItemProps extends TreeMenuBaseItemProps, PrimitiveWithBaseProps {}

/**
 * Properties for the TreeMenuButton component.
 */
export interface TreeMenuButtonProps extends ButtonProps {
  /**
   * When `true`, prevents the user from activating the item.
   *
   * @default false
   */
  disabledActive?: boolean;
}

/**
 * Properties for the TreeMenuCollapsible component.
 */
export interface TreeMenuCollapsibleProps extends PrimitiveWithBaseProps {
  /**
   * When `true`, prevents the user from activating the collapsible trigger.
   */
  disabledCollapsible?: boolean;
}

/**
 * Properties for the TreeMenuSub component.
 */
export interface TreeMenuSubProps extends PrimitiveWithBaseProps {}

/**
 * Option data for the TreeMenu component.
 */
export interface TreeMenuBaseOptionData extends TreeMenuBaseItemProps, LinkBaseProps {
  /**
   * Whether the option is a top-level group.
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
   * Badge text rendered for the option.
   */
  badge?: string;
  /**
   * Properties forwarded to the badge component.
   */
  badgeProps?: Omit<BadgeCompactProps, 'content'>;
  /**
   * Tag text rendered for the option.
   */
  tag?: string;
  /**
   * Properties forwarded to the tag element.
   */
  tagProps?: BaseProps;
  /**
   * Properties forwarded to the tooltip component.
   */
  tooltipProps?: Omit<TooltipCompactProps, 'content'>;
  /**
   * Properties forwarded to the collapsed dropdown menu.
   */
  dropdownMenuProps?: Omit<DropdownMenuCompactProps<string>, 'activeValue' | 'items'>;
  /**
   * Action items rendered at the end of the option.
   */
  actions?: MenuOptionData[];
  /**
   * Properties forwarded to the action dropdown menu.
   */
  actionMenuProps?: Omit<DropdownMenuCompactProps, 'activeValue' | 'items'>;
  /**
   * Callback invoked when an action is selected.
   */
  onActionSelect?: (action: MenuOptionData) => void;
}

/**
 * Recursive option data for the TreeMenu component.
 */
export type TreeMenuOptionData<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = Omit<T, 'children'> & {
  /**
   * Child options.
   */
  children?: TreeMenuOptionData<T>[];
};

/**
 * Properties for the TreeMenuOptionCompact component.
 */
export interface TreeMenuOptionCompactProps {
  /**
   * Rendered element tag.
   */
  as?: AsTag;
  /**
   * Current item data.
   */
  item: TreeMenuOptionData;
  /**
   * Horizontal side.
   */
  side?: HorizontalSide;
  /**
   * The active paths of the tree menu, used to determine whether the current item is active or has active descendants.
   */
  activePaths?: string[];
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
 * Events for the TreeMenuOptionCompact component.
 */
export type TreeMenuOptionCompactEmits = {
  /**
   * Emitted when select dropdown occurs.
   */
  selectDropdown: [value: string];
};

/**
 * Slot properties for the TreeMenuOptionCompact component.
 */
export interface TreeMenuOptionSlotCompactProps extends TreeMenuOptionCompactProps {
  /**
   * Whether to show the link icon.
   */
  showLinkIcon?: boolean;
}

/**
 * Properties for the TreeMenuOptionsCompact component.
 */
export interface TreeMenuOptionsCompactProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> extends Pick<
  TreeMenuOptionCompactProps,
  'side' | 'itemProps' | 'buttonProps' | 'linkProps' | 'collapsibleProps' | 'subProps'
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
 * Events for the TreeMenuOptionsCompact component.
 */
export type TreeMenuOptionsCompactEmits = TreeMenuOptionCompactEmits;

/**
 * Slot properties for TreeMenuItemCompact.
 */
export interface TreeMenuItemCompactSlotProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> {
  /**
   * Current item data.
   */
  item: TreeMenuOptionData<T>;
  /**
   * Whether the current item should show the external link icon.
   */
  showLinkIcon: boolean;
  /**
   * Whether the current item has visible children.
   */
  hasChildren: boolean;
  /**
   * Whether any descendant of the current item is active.
   */
  childActive: boolean;
}

/**
 * Properties for the TreeMenuCompact component.
 */
export interface TreeMenuCompactProps<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData>
  extends TreeMenuRootProps, TreeMenuOptionsCompactProps<T> {}

/**
 * Events for the TreeMenuCompact component.
 */
export type TreeMenuCompactEmits = TreeMenuRootEmits & TreeMenuOptionsCompactEmits;

/**
 * Slots for the TreeMenuCompact component.
 */
export type TreeMenuCompactSlots<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = {
  /**
   * Custom content rendered before the options.
   */
  top?: () => any;
  /**
   * Custom content rendered after the options.
   */
  bottom?: () => any;
  /**
   * Custom content for the group label slot.
   */
  'group-label'?: (props: { item: TreeMenuOptionData<T> }) => any;
  /**
   * Custom content for the item slot.
   */
  item?: (props: { item: T }) => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: { item: T }) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: { item: T }) => any;
};

/**
 * Parameters used to create the TreeMenuRoot context.
 */
export interface TreeMenuRootContextParams {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
  /**
   * Expanded used by the component context.
   */
  expanded: ShallowRef<string[]>;
  /**
   * Whether the component is collapsed.
   */
  collapsed: ShallowRef<boolean>;
}

/**
 * Context for the TreeMenuItem component.
 */
export interface TreeMenuItemContext {
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Whether the current item is active.
   */
  isActive: ComputedRef<boolean>;
  /**
   * Whether the current item is expanded.
   */
  isExpanded: ComputedRef<boolean>;
  /**
   * Callback invoked when the expanded toggles.
   */
  onExpandedToggle: () => void;
  /**
   * Callback invoked when the active event fires.
   */
  onActive: () => void;
}

/**
 * Parameters used to create the TreeMenuSub context.
 */
export interface TreeMenuSubContextParams {
  /**
   * Whether the current context is nested.
   */
  isSub: boolean;
}

/**
 * Available UI slots for the TreeMenu component.
 */
export type TreeMenuUiSlot =
  | 'root'
  | 'groupRoot'
  | 'groupLabel'
  | 'group'
  | 'item'
  | 'button'
  | 'itemLabel'
  | 'itemAbsolute'
  | 'itemTag'
  | 'itemAction'
  | 'itemLinkIcon'
  | 'collapsibleIcon'
  | 'sub'
  | 'subItem'
  | 'subButton'
  | 'collapsibleRoot'
  | 'collapsibleTrigger'
  | 'collapsibleContent'
  | 'tooltipPositioner'
  | 'tooltipPopup'
  | 'tooltipArrow'
  | 'badgeRoot'
  | 'badgeContent';

/**
 * UI class overrides for the TreeMenu component.
 */
export type TreeMenuUi = UiClass<TreeMenuUiSlot>;
