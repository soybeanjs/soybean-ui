import type { DefinedValue, Direction, Placement, UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
import type { ButtonProps } from '../button/types';
import type { DropdownMenuTriggerType } from '../dropdown-menu/types';
import type { LinkExtraProps } from '../link/types';
import type {
  MenuArrowProps,
  MenuGroupLabelProps,
  MenuItemProps,
  MenuOptionData,
  MenuOptionsCompactSlots,
  MenuPopupProps,
  MenuPortalProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSubContentProps,
  MenuSubTriggerProps
} from '../menu';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the TreeNavCompact component.
 */
export interface TreeNavCompactProps<T extends DefinedValue = DefinedValue> extends Omit<
  PrimitiveWithBaseProps,
  'onSelect'
> {
  /** The value of the currently selected item. Can be used as `v-model`. */
  modelValue?: T;
  /** The value of the item that should be selected when initially rendered. */
  defaultValue?: T;
  /** The tree items rendered as top-level navigation entries. */
  items: MenuOptionData<T>[];
  /** The reading direction of the component when applicable. */
  dir?: Direction;
  /**
   * How branch popups are opened.
   *
   * - `click`: The popup will be opened when the trigger is clicked.
   * - `hover`: The popup will be opened when the trigger is hovered.
   *
   * @defaultValue 'hover'
   */
  trigger?: DropdownMenuTriggerType;
  /**
   * The duration from when the pointer enters a branch trigger until the
   * popup gets opened in hover mode.
   *
   * @defaultValue 150
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another branch trigger without
   * incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;
  /**
   * The preferred placement of branch popups relative to their trigger.
   *
   * @defaultValue 'bottom-start'
   */
  placement?: Placement;
  /**
   * Whether branch popups show an arrow.
   *
   * @defaultValue false
   */
  showArrow?: boolean;
  /**
   * Whether the whole navigation bar is disabled.
   */
  disabled?: boolean;
  /**
   * Whether top-level overflow items collapse into a trailing "more" branch
   * popup so the bar always fits inside its container.
   *
   * @defaultValue false
   */
  collapsible?: boolean;
  /**
   * Label of the trailing "more" trigger when `collapsible`.
   *
   * @defaultValue 'More'
   */
  moreLabel?: string;
  /**
   * Icon of the trailing "more" trigger when `collapsible`.
   *
   * @defaultValue 'lucide:ellipsis'
   */
  moreIcon?: IconValue;
  /**
   * Properties forwarded to the trailing "more" trigger button.
   */
  moreProps?: ButtonProps;
  /**
   * Properties forwarded to the link element of link items.
   */
  linkProps?: LinkExtraProps;
  /**
   * Properties forwarded to the item element of popup items.
   */
  itemProps?: MenuItemProps;
  /**
   * Properties forwarded to the group label element of popup group labels.
   */
  groupLabelProps?: MenuGroupLabelProps;
  /**
   * Properties forwarded to the shortcut element of popup items.
   */
  shortcutProps?: MenuShortcutProps;
  /**
   * Properties forwarded to the separator element of popup separators.
   */
  separatorProps?: MenuSeparatorProps;
  /**
   * Properties forwarded to the sub trigger element of popup branches.
   */
  subTriggerProps?: MenuSubTriggerProps;
  /**
   * Properties forwarded to the sub content element of popup branches.
   */
  subContentProps?: MenuSubContentProps;
  /**
   * Properties forwarded to the portal element of popups.
   */
  portalProps?: MenuPortalProps;
  /**
   * Properties forwarded to the popup element of popups.
   */
  popupProps?: MenuPopupProps;
  /**
   * Properties forwarded to the arrow element of popups.
   */
  arrowProps?: MenuArrowProps;
}

/**
 * Events for the TreeNavCompact component.
 */
export interface TreeNavCompactEmits<T extends DefinedValue = DefinedValue> {
  /**
   * Emitted when the selected value changes.
   */
  'update:modelValue': [value: T];
  /**
   * Emitted when an item is selected.
   */
  select: [item: MenuOptionData<T>, event: Event];
}

/**
 * Display entry describing the trailing "more" trigger when `collapsible`.
 */
export interface TreeNavMoreEntry {
  /** Label of the "more" trigger. */
  label: string;
  /** Icon of the "more" trigger. */
  icon?: IconValue;
}

/**
 * Slots for the TreeNavCompact component.
 */
export type TreeNavCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  /**
   * Custom content for the trailing "more" trigger when `collapsible`.
   */
  'more-trigger'?: (props: TreeNavMoreEntry) => any;
};

/**
 * Available UI slots for the TreeNav component.
 */
export type TreeNavUiSlot = 'root' | 'item' | 'itemIcon' | 'itemChevron' | 'itemLinkIcon';

/**
 * UI class overrides for the TreeNav component.
 */
export type TreeNavUi = UiClass<TreeNavUiSlot>;

/**
 * Properties for the internal top-level renderer of `TreeNavCompact`.
 *
 * Identical to {@link TreeNavCompactProps} except that the visible/more item
 * split is provided by the compact orchestrator instead of being derived here.
 */
export interface TreeNavTopProps<T extends DefinedValue = DefinedValue> extends Omit<
  TreeNavCompactProps<T>,
  'items' | 'collapsible'
> {
  /** Top-level items rendered as visible entries. */
  items: MenuOptionData<T>[];
  /** Items collapsed into the trailing "more" popup. */
  moreItems?: MenuOptionData<T>[];
}
