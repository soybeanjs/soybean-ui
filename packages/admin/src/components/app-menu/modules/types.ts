import type { ClassValue } from '@soybeanjs/headless/types';
import type { AppMenuData } from '../../../types';
import type { AppMenuEmits } from '../types';

/**
 * Internal props shared by all `AppMenu` mode sub-components
 * (`VerticalMenu` / `MixMenu` / `VerticalHybridMenu` / `HorizontalMenu` /
 * `TopSidebarMenu` / `TopHeaderMenu`).
 */
export interface AppMenuModeProps {
  /** Root classes computed by `AppMenu` (mode / inverted variants). */
  rootClass?: ClassValue;
  /** The full menu data model. */
  data: AppMenuData[];
  /** The active menu key (controlled). */
  selectedKey?: string;
  /** The active menu key when initially rendered (uncontrolled). */
  defaultSelectedKey?: string;
  /** The expanded menu keys (controlled). */
  expanded?: string[];
  /** The expanded menu keys when initially rendered (uncontrolled). */
  defaultExpanded?: string[];
  /** Whether the menu is collapsed (icons only). */
  siderCollapse?: boolean;
  /** Whether to use inverted (dark) styling. */
  inverted?: boolean;
  /** The width of the collapsed menu. */
  collapsedWidth?: number;
  /** Whether the mix-mode child drawer is pinned. */
  mixSiderFixed?: boolean;
  /** The width of the mix-mode child drawer (in px). */
  mixMenuWidth?: number;
  /** Whether to auto-select the deepest menu when a parent is chosen. */
  autoSelectFirstMenu?: boolean;
  /** The id of the header element to mount header-level menus into. */
  headerMenuEl?: string;
  /** The id of the sider element to mount sider-level menus into. */
  siderMenuEl?: string;
}

/**
 * Internal emits shared by all `AppMenu` mode sub-components.
 */
export type AppMenuModeEmits = AppMenuEmits;
