import type { ComputedRef, ShallowRef } from 'vue';
import type { BaseProps, Direction, UiClass } from '../../types';
import type { KbdValue } from '../kbd/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';
import type { TreeMenuBaseOptionData } from '../tree-menu/types';

/**
 * Available menu shapes for the SplitMenu component.
 *
 * - `dual-vertical`: level-1 vertical + level-2 vertical, two vertical columns.
 * - `vertical-horizontal`: level-1 vertical + level-2 horizontal.
 * - `horizontal-vertical`: level-1 horizontal + level-2 vertical.
 * - `horizontal-dual-vertical`: level-1 horizontal + level-2 vertical + level-3 vertical (three panels).
 */
export type SplitMenuMode =
  | 'dual-vertical'
  | 'vertical-horizontal'
  | 'horizontal-vertical'
  | 'horizontal-dual-vertical';

/**
 * Orientation of a single SplitMenu panel.
 */
export type SplitMenuOrientation = 'vertical' | 'horizontal';

/**
 * Describes a single panel of a {@link SplitMenuMode} layout.
 */
export interface SplitMenuPanelDescriptor {
  /**
   * Panel depth (1-based): 1 = level-1 menu, 2 = level-2 menu, 3 = level-3 menu.
   */
  depth: number;
  /**
   * Orientation of the panel.
   */
  orientation: SplitMenuOrientation;
}

/**
 * Properties for the SplitMenuRoot component.
 */
export interface SplitMenuRootProps extends Omit<PrimitiveWithBaseProps, 'onSelect'> {
  /**
   * The menu shape.
   *
   * @default 'dual-vertical'
   */
  mode?: SplitMenuMode;
  /**
   * The active value of the menu. Can be bound with `v-model`.
   */
  modelValue?: string;
  /**
   * The active value when initially rendered. Use when you do not need to control the state.
   */
  defaultValue?: string;
  /**
   * Whether the level-1 vertical panel is collapsed.
   */
  collapsed?: boolean;
  /**
   * The collapsed state when initially rendered.
   */
  defaultCollapsed?: boolean;
  /**
   * The reading direction of the menu when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR.
   */
  dir?: Direction;
}

/**
 * Events for the SplitMenuRoot component.
 */
export type SplitMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the collapsed state changes.
   */
  'update:collapsed': [value: boolean];
  /**
   * Emitted when a leaf menu item is chosen.
   */
  select: [key: string, event?: Event];
};

/**
 * Properties for the SplitMenuPanel component.
 */
export interface SplitMenuPanelProps extends BaseProps {
  /**
   * Panel depth (1-based). Exposed via `data-depth` for styling.
   *
   * @default 1
   */
  depth?: number;
  /**
   * Orientation of the panel.
   *
   * @default 'vertical'
   */
  orientation?: SplitMenuOrientation;
  /**
   * The menu items rendered in this panel.
   */
  items?: SplitMenuOptionData[];
  /**
   * The id of the element to mount horizontal panels into (rendered via `Teleport`).
   *
   * When unset, the panel renders in place.
   */
  horizontalMenuEl?: string;
  /**
   * The id of the element to mount vertical panels into (rendered via `Teleport`).
   *
   * When unset, the panel renders in place.
   */
  verticalMenuEl?: string;
}

/**
 * Events for the SplitMenuPanel component.
 */
export type SplitMenuPanelEmits = {
  /**
   * Emitted when a leaf item is selected.
   */
  panelSelect: [value: string];
};

/**
 * Properties for the SplitMenuItem component.
 */
export interface SplitMenuItemProps extends PrimitiveWithBaseProps {
  /**
   * The unique value of the item.
   */
  value: string;
  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: boolean;
  /**
   * The rendering orientation of the item.
   *
   * @default 'vertical'
   */
  orientation?: SplitMenuOrientation;
}

/**
 * Properties for the SplitMenuTrigger component.
 */
export interface SplitMenuTriggerProps extends PrimitiveWithBaseProps {
  /**
   * The unique value of the trigger.
   */
  value: string;
  /**
   * When `true`, prevents the user from interacting with the trigger.
   */
  disabled?: boolean;
  /**
   * The rendering orientation of the trigger.
   *
   * @default 'vertical'
   */
  orientation?: SplitMenuOrientation;
  /**
   * Whether the trigger is collapsed to an icon-only rail.
   */
  collapsed?: boolean;
}

/**
 * Properties for the SplitMenuContent component.
 */
export interface SplitMenuContentProps extends PrimitiveWithBaseProps {
  /**
   * The id of the element to mount the content into (rendered via `Teleport`).
   *
   * When unset, the content renders in place.
   */
  to?: string;
}

/**
 * Recursive option data for the SplitMenu component.
 *
 * A superset of the vertical `TreeMenuBaseOptionData`, so a single tree can
 * feed both vertical and horizontal panels.
 */
export interface SplitMenuBaseOptionData extends TreeMenuBaseOptionData {
  /**
   * The shortcut rendered at the end of the horizontal option.
   */
  shortcut?: KbdValue | KbdValue[];
  /**
   * Whether to show a separator after the horizontal option.
   */
  separator?: boolean;
  /**
   * The text value used for typeahead in horizontal menus.
   */
  textValue?: string;
}

/**
 * Recursive option data for the SplitMenu component.
 */
export type SplitMenuOptionData<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData> = Omit<T, 'children'> & {
  /**
   * Child options.
   */
  children?: SplitMenuOptionData<T>[];
};

/**
 * Properties for the SplitMenuCompact component.
 */
export interface SplitMenuCompactProps<
  T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData
> extends SplitMenuRootProps {
  /**
   * The level-1 menu items.
   */
  items: SplitMenuOptionData<T>[];
  /**
   * The id of the element to mount horizontal panels into (rendered via `Teleport`).
   *
   * When unset, the panels render in place.
   */
  horizontalMenuEl?: string;
  /**
   * The id of the element to mount vertical panels into (rendered via `Teleport`).
   *
   * When unset, the panels render in place.
   */
  verticalMenuEl?: string;
}

/**
 * Events for the SplitMenuCompact component.
 */
export type SplitMenuCompactEmits = SplitMenuRootEmits;

/**
 * Slots for the SplitMenuCompact component.
 */
export type SplitMenuCompactSlots<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData> = {
  /**
   * Custom content rendered before the panels.
   */
  top?: () => any;
  /**
   * Custom content rendered after the panels.
   */
  bottom?: () => any;
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
  /**
   * Custom content for the horizontal trigger slot.
   */
  trigger?: (data: { item: T }) => any;
};

/**
 * Parameters used to create the SplitMenuRoot context.
 */
export interface SplitMenuRootContextParams {
  /**
   * Current menu mode.
   */
  mode: ShallowRef<SplitMenuMode>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
  /**
   * Whether the level-1 vertical panel is collapsed.
   */
  collapsed: ShallowRef<boolean>;
  /**
   * Reading direction prop, resolved against `ConfigProvider` in the context.
   */
  dir: ComputedRef<Direction | undefined>;
}

/**
 * Context for a rendered SplitMenu item or trigger.
 */
export interface SplitMenuItemContext {
  /**
   * Value associated with the current item/trigger.
   */
  value: string;
}

/**
 * Available UI slots for the SplitMenu component.
 */
export type SplitMenuUiSlot =
  | 'root'
  | 'panelRow'
  | 'panel'
  | 'panelVertical'
  | 'panelHorizontal'
  | 'item'
  | 'itemIcon'
  | 'itemLabel'
  | 'itemLeading'
  | 'itemTrailing'
  | 'itemLinkIcon'
  | 'trigger'
  | 'triggerIcon'
  | 'collapsibleIcon'
  | 'group'
  | 'groupLabel'
  | 'sub'
  | 'shortcut'
  | 'separator';

/**
 * UI class overrides for the SplitMenu component.
 */
export type SplitMenuUi = UiClass<SplitMenuUiSlot>;
