import type { Ref } from 'vue';
import { useContext } from '@soybeanjs/headless/composables';
import type { AppLayoutMode } from '../types';

/**
 * Reactive context shared between `AppLayout` and `AppMenu`.
 *
 * A single `mode` keeps the layout skeleton and the navigation shape in sync
 * (see docs/admin-roadmap.md §4.3). All values are reactive refs so both
 * consumers re-render on change.
 *
 * Fields owned by `AppLayout` (mode / open / widths / mount targets) are read
 * by `AppMenu`; fields derived from menu data (`mixSiderFixed` toggled by the
 * pin button, `hasSecondLevel` / `mixHasDrawer` derived from the active
 * branch) are written back by `AppMenu` so the layout can adapt the sider
 * width, 对齐 soybean-admin `provideMixMenuContext`.
 */
export interface AppLayoutContextValue {
  /** The active layout/menu mode. */
  mode: Ref<AppLayoutMode>;
  /** Whether the sidebar is open (desktop). */
  open: Ref<boolean>;
  /** Whether the sidebar is collapsed. */
  siderCollapse: Ref<boolean>;
  /** Whether the viewport is in mobile mode (drawer sidebar). */
  isMobile: Ref<boolean>;
  /**
   * Whether the mix-mode child drawer is pinned. Owned by `AppLayout`,
   * toggled through the context by `AppMenu`'s pin button (and re-emitted as
   * `update:mixSiderFixed` for optional external persistence).
   */
  mixSiderFixed: Ref<boolean>;
  /**
   * Whether the active first-level branch has second-level menus. Written by
   * `AppMenu` hybrid/top modules; the layout hides the sider when the
   * sider-level menu would be empty (`vertical-hybrid` / `top-header`).
   */
  hasSecondLevel: Ref<boolean>;
  /**
   * Whether the mix-mode child drawer occupies sider space (pinned and the
   * active branch has children). Written by `AppMenu`; the layout adds
   * `mixMenuWidth` to the sider width when true.
   */
  mixHasDrawer: Ref<boolean>;
  /** The resolved mix-mode child drawer width in px. */
  mixMenuWidth: Ref<number>;
  /** The resolved sider width in px (including the pinned drawer). */
  sidebarWidth: Ref<number>;
  /** The resolved collapsed sider width in px. */
  collapsedSidebarWidth: Ref<number>;
  /** Whether the sidebar is visible for the current `mode`. */
  siderVisible: Ref<boolean>;
  /** The id of the header element that header-level menus teleport into. */
  headerMenuEl: Ref<string>;
  /** The id of the sider element that sider-level menus teleport into. */
  siderMenuEl: Ref<string>;
}

/**
 * AppLayout context pair.
 *
 * - `provideAppLayoutContext(value)` — provided by `AppLayout`.
 * - `useAppLayoutContext()` — optional injection, returns `AppLayoutContextValue | null`
 *   so `AppMenu` can degrade to standalone usage when no `AppLayout` wraps it.
 * - `useAppLayoutContext('AppMenu')` — required injection, throws if absent.
 */
export const [provideAppLayoutContext, useAppLayoutContext] = useContext<AppLayoutContextValue>('AppLayout');
