import type { Component, VNode } from 'vue';

/**
 * The unified layout/menu mode.
 *
 * A single mode drives both the layout skeleton (via `AppLayout`) and the
 * navigation shape (via `AppMenu`), so the two stay in sync.
 */
export type AppLayoutMode =
  | 'vertical'
  | 'vertical-mix'
  | 'vertical-hybrid'
  | 'horizontal'
  | 'top-sidebar'
  | 'top-header';

/**
 * The menu shape is a projection of the layout shape onto the navigation area,
 * therefore it shares the exact same value domain as {@link AppLayoutMode}.
 */
export type AppMenuMode = AppLayoutMode;

/**
 * The navigation data model consumed by `AppMenu` and related navigational
 * components (breadcrumb, command palette).
 */
export interface AppMenuData {
  /** Unique key of the menu node (can be the route name). */
  key: string;
  /** Optional route key used to navigate when selected. */
  routeKey?: string;
  /** Display label. */
  label: string;
  /** Optional icon (iconify name, e.g. `lucide:user`). */
  icon?: string;
  /** Child menu nodes. */
  children?: AppMenuData[];
  /** Whether to hide the node from the menu. */
  hideInMenu?: boolean;
  /** Optional badge text/number. */
  badge?: string | number;
  /** Whether the node is disabled. */
  disabled?: boolean;
}

/**
 * Horizontal alignment of a table cell.
 */
export type AppTableAlign = 'left' | 'center' | 'right';

/**
 * Fixed side of a table column.
 */
export type AppTableFixed = 'left' | 'right';

/**
 * Config-driven column definition consumed by `AppProTable`.
 *
 * @typeParam T - The row data shape.
 */
export interface AppTableColumn<T = Record<string, unknown>> {
  /** Field key bound to the row data (or an arbitrary key for custom slots). */
  key: keyof T | (string & {});
  /** Header label. */
  label: string;
  /** Column width in px. */
  width?: number;
  /** Minimum column width in px. */
  minWidth?: number;
  /** Cell horizontal alignment. */
  align?: AppTableAlign;
  /** Whether to fix the column to a side while scrolling. */
  fixed?: AppTableFixed;
  /** Whether the column is sortable. */
  sortable?: boolean;
  /** Whether to ellipsize overflowing cell content. */
  ellipsis?: boolean;
  /** Render a custom cell VNode. */
  render?: (row: T, index: number) => VNode;
  /** Name of the slot used to render the header cell. */
  headerSlot?: string;
  /** Name of the slot used to render the cell. */
  cellSlot?: string;
}

/**
 * The built-in form control types supported by `AppProForm`.
 */
export type AppFormControl =
  | 'input'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date'
  | 'date-range'
  | 'time'
  | 'custom';

/**
 * A selectable option for control types that accept options.
 */
export interface AppFormOption {
  /** Display label. */
  label: string;
  /** Option value. */
  value: string | number | boolean;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

/**
 * Config-driven field schema consumed by `AppProForm` / `AppSearchForm`.
 */
export interface AppFormSchema {
  /** Field name bound to the form model. */
  field: string;
  /** Field label. */
  label: string;
  /** Built-in control type, or a custom component. */
  control: AppFormControl | Component;
  /** Placeholder text. */
  placeholder?: string;
  /** Whether the field is required. */
  required?: boolean;
  /** Default value when the form is reset. */
  defaultValue?: unknown;
  /** Options for option-based controls (`select`/`radio`/`checkbox`). */
  options?: AppFormOption[];
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is hidden. */
  hidden?: boolean;
  /** Grid span occupied by the field (search form layout). */
  span?: number;
  /** Slot names used to render the control. */
  slots?: Record<string, string>;
}

/**
 * A single page tab consumed by `AppMultiTab`.
 */
export interface AppTab {
  /** Route name used for navigation and cache key. */
  routeName: string;
  /** Full resolved path. */
  fullPath: string;
  /** Tab label. */
  label: string;
  /** Whether the tab is pinned (cannot be closed). */
  pinned?: boolean;
  /** Optional icon (iconify name). */
  icon?: string;
}
