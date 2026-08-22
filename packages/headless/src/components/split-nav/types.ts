import type { ComputedRef, ShallowRef } from 'vue';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';
import type { KbdValue } from '../kbd/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';
import type { TreeMenuBaseOptionData } from '../tree-menu/types';

/**
 * Available menu shapes for the SplitNav component.
 *
 * - `dual-vertical`: level-1 vertical + remaining tree vertical.
 * - `vertical-horizontal`: level-1 vertical + nested Menubar.
 * - `horizontal-vertical`: level-1 horizontal + nested TreeMenu.
 * - `horizontal-dual-vertical`: level-1 horizontal + nested dual-vertical.
 */
export type SplitNavMode = 'dual-vertical' | 'vertical-horizontal' | 'horizontal-vertical' | 'horizontal-dual-vertical';

/**
 * Option data for the SplitNav component.
 *
 * Extends the vertical `TreeMenuBaseOptionData` so a single tree can feed both
 * TreeMenu and Menubar renderers.
 */
export interface SplitNavBaseOptionData extends TreeMenuBaseOptionData {
  /**
   * The shortcut rendered at the end of a horizontal option.
   */
  shortcut?: KbdValue | KbdValue[];
  /**
   * Whether to show a separator after a horizontal option.
   */
  separator?: boolean;
  /**
   * The text value used for typeahead in horizontal menus.
   */
  textValue?: string;
}

/**
 * Recursive option data for the SplitNav component.
 */
export type SplitNavOptionData<T extends SplitNavBaseOptionData = SplitNavBaseOptionData> = Omit<T, 'children'> & {
  /**
   * Child options.
   */
  children?: SplitNavOptionData<T>[];
};

/**
 * Properties for the SplitNavRoot component.
 */
export interface SplitNavRootProps<T extends SplitNavBaseOptionData = SplitNavBaseOptionData> extends Omit<
  PrimitiveWithBaseProps,
  'onSelect'
> {
  /**
   * The reading direction of the menu when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR.
   */
  dir?: Direction;
  /**
   * The menu shape.
   *
   * @default 'dual-vertical'
   */
  mode?: SplitNavMode;
  /**
   * The active value of the SplitNav component. Can be bound with `v-model`.
   */
  modelValue?: string;
  /**
   * The value of the SplitNav component when initially rendered. Use when you do not need to control the state.
   */
  defaultValue?: string;
  /**
   * The option data for the SplitNav component.
   */
  items: SplitNavOptionData<T>[];
  /**
   * The id of the element to mount horizontal menus into (rendered via `Teleport`).
   *
   * When unset, the horizontal menus render in place. Pass the element id without `#`.
   */
  horizontalMountedId?: string;
  /**
   * The id of the element to mount vertical menus into (rendered via `Teleport`).
   *
   * When unset, the vertical menus render in place. Pass the element id without `#`.
   */
  verticalMountedId?: string;
  /**
   * Whether first-level keyboard navigation loops from last item to first and vice versa.
   *
   * @default true
   */
  loop?: boolean;
}

/**
 * Events for the SplitNavRoot component.
 */
export type SplitNavRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when a leaf menu item is chosen.
   */
  select: [key: string, event?: Event];
};

/**
 * Slots for the SplitNavRoot component.
 */
export type SplitNavRootSlots<T extends SplitNavBaseOptionData = SplitNavBaseOptionData> = {
  /**
   * Custom content for a first-level item.
   */
  'first-level-item'?: (props: { item: SplitNavOptionData<T>; active: boolean }) => any;
  /**
   * Custom content for a nested TreeMenu item.
   */
  item?: (props: { item: T }) => any;
  /**
   * Custom content for a nested TreeMenu item leading slot.
   */
  'item-leading'?: (props: { item: T }) => any;
  /**
   * Custom content for a nested TreeMenu item trailing slot.
   */
  'item-trailing'?: (props: { item: T }) => any;
  /**
   * Custom content for a nested Menubar trigger.
   */
  trigger?: (props: { item: T }) => any;
};

/**
 * Properties for the VerticalFirstLevelMenu component.
 */
export interface VerticalFirstLevelMenuProps extends PrimitiveWithBaseProps {
  /**
   * First-level items rendered by the vertical rail.
   */
  items: SplitNavOptionData[];
}

/**
 * Properties for the HorizontalFirstLevelMenu component.
 */
export interface HorizontalFirstLevelMenuProps extends PrimitiveWithBaseProps {
  /**
   * First-level items rendered by the horizontal bar.
   */
  items: SplitNavOptionData[];
}

/**
 * Properties for the internal first-level menu.
 */
export interface FirstLevelMenuProps extends PrimitiveWithBaseProps {
  /**
   * First-level items rendered by the menu.
   */
  items: SplitNavOptionData[];
  /**
   * Orientation of the first-level roving focus group.
   */
  orientation: DataOrientation;
}

/**
 * Properties for a first-level item.
 */
export interface FirstLevelItemProps {
  /**
   * Option data for the item.
   */
  item: SplitNavOptionData;
}

/**
 * Properties for the DualVerticalMenu component.
 */
export interface DualVerticalMenuProps {
  /**
   * Option data rendered as this dual-vertical pane's first level.
   *
   * When omitted, the pane uses the root `items`. Nested `horizontal-dual-vertical`
   * passes the children of the active horizontal first-level item.
   */
  items?: SplitNavOptionData[];
}

/**
 * Parameters used to create the SplitNavRoot context.
 */
export interface SplitNavRootContextParams extends PropsToContext<
  SplitNavRootProps,
  'mode' | 'items' | 'horizontalMountedId' | 'verticalMountedId' | 'loop'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
  /**
   * Reading direction prop, resolved against `ConfigProvider` in the context.
   */
  dir: ComputedRef<Direction | undefined>;
  /**
   * Activate an item by value: updates `modelValue` and emits `select` for leaves.
   */
  onItemActivate: (value: string, event?: Event) => void;
}

/**
 * Available UI slots for the SplitNav component.
 */
export type SplitNavUiSlot =
  | 'root'
  | 'verticalPane'
  | 'firstLevel'
  | 'firstLevelItem'
  | 'firstLevelItemIcon'
  | 'firstLevelItemLabel'
  | 'subVertical'
  | 'subHorizontal'
  | 'item'
  | 'itemIcon'
  | 'itemLabel'
  | 'itemLeading'
  | 'itemTrailing'
  | 'itemLinkIcon'
  | 'collapsibleIcon'
  | 'group'
  | 'groupLabel'
  | 'sub'
  | 'trigger'
  | 'triggerIcon'
  | 'shortcut'
  | 'separator';

/**
 * UI class overrides for the SplitNav component.
 */
export type SplitNavUi = UiClass<SplitNavUiSlot>;
