import type { TreeMenuOptionData } from '@soybeanjs/headless/tree-menu';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { AppMenuData, AppMenuMode } from '../../types';

/**
 * Properties for the AppMenu component.
 *
 * `AppMenu` renders the navigation shape for a given layout mode on top of
 * `@soybeanjs/ui` menu primitives (`STreeMenu` / `SNavigationMenu` /
 * `FirstLevelMenu`). It consumes the optional `AppLayoutContext` for
 * `siderCollapse` / `mode`; when used standalone it degrades to its own `mode`
 * prop.
 */
export interface AppMenuProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * The menu data model.
   */
  data: AppMenuData[];
  /**
   * The menu shape. When unset, resolved from `AppLayoutContext`.
   *
   * @default 'vertical'
   */
  mode?: AppMenuMode;
  /**
   * The active menu key (controlled, `v-model:selected-key`).
   */
  selectedKey?: string;
  /**
   * The active menu key when initially rendered (uncontrolled).
   */
  defaultSelectedKey?: string;
  /**
   * The expanded menu keys (controlled, `v-model:expanded`).
   */
  expanded?: string[];
  /**
   * The expanded menu keys when initially rendered (uncontrolled).
   */
  defaultExpanded?: string[];
  /**
   * Whether the menu is collapsed (icons only). When unset, resolved from
   * `AppLayoutContext.siderCollapse`.
   */
  siderCollapse?: boolean;
  /**
   * Whether to use inverted (dark) styling.
   */
  inverted?: boolean;
  /**
   * The width of the collapsed menu.
   *
   * @default 50
   */
  collapsedWidth?: number;
  /**
   * Whether the mix-mode child drawer is pinned. When unset, resolved from
   * `AppLayoutContext.mixSiderFixed`.
   */
  mixSiderFixed?: boolean;
  /**
   * The width of the mix-mode child drawer (in px).
   *
   * @default 220
   */
  mixMenuWidth?: number;
  /**
   * In mix modes (`vertical-hybrid` / `top-sidebar` / `top-header`), whether to
   * auto-select the deepest menu when a parent is chosen.
   *
   * @default true
   */
  autoSelectFirstMenu?: boolean;
  /**
   * The id of the header element to mount header-level menus into (对齐
   * `GLOBAL_HEADER_MENU_ID`). When unset the menu renders in place.
   */
  headerMenuEl?: string;
  /**
   * The id of the sider element to mount sider-level menus into (对齐
   * `GLOBAL_SIDER_MENU_ID`). When unset the menu renders in place.
   */
  siderMenuEl?: string;
}

/**
 * Events for the AppMenu component.
 */
export type AppMenuEmits = {
  /**
   * Emitted when the active menu key changes.
   */
  'update:selectedKey': [value: string | undefined];
  /**
   * Emitted when the expanded menu keys change.
   */
  'update:expanded': [value: string[]];
  /**
   * Emitted to toggle the sidebar collapse state.
   */
  'update:siderCollapse': [value: boolean];
  /**
   * Emitted to toggle whether the mix-mode child drawer is pinned.
   */
  'update:mixSiderFixed': [value: boolean];
  /**
   * Emitted when a leaf menu item is chosen.
   */
  select: [key: string];
};

/**
 * Slots for the AppMenu component.
 */
export interface AppMenuSlots {
  /**
   * Custom content rendered before the menu options.
   */
  top?: () => any;
  /**
   * Custom content rendered after the menu options.
   */
  bottom?: () => any;
}

/**
 * Internal option data derived from {@link AppMenuData} for `STreeMenu`.
 */
export type AppMenuTreeOption = TreeMenuOptionData;
