import type {
  LayoutCompactProps,
  LayoutCompactEmits,
  LayoutCompactSlots,
  LayoutUi,
  LayoutVariant,
  LayoutCollapsible
} from '@soybeanjs/headless/layout';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@soybeanjs/ui';
import type { AppLayoutMode } from '../../types';

/**
 * Properties for the AppLayout component.
 *
 * `AppLayout` is a unified shell built on the single `SLayout` component (the
 * unified `variant` / `orientation` / `scrollBehavior` / `fixedTop` /
 * `fixedFooter` layout), and drives the navigation shape via `mode` (see
 * docs/admin-roadmap.md §3.2 / §4.3). All underlying layout props are
 * forwarded, so the shell presentation is configured directly through
 * `LayoutCompactProps`.
 */
export interface AppLayoutProps extends LayoutCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * The unified layout/menu mode.
   *
   * @default 'vertical'
   */
  mode?: AppLayoutMode;
  /**
   * Whether the mobile drawer is active. When unset, resolved from the widget
   * width against `mobileBreakpoint`.
   */
  isMobile?: boolean;
  /**
   * Viewport width (px) below which the layout enters mobile mode.
   *
   * @default 768
   */
  mobileBreakpoint?: number;
  /**
   * The id of the header element that header-level menus teleport into (对齐
   * `GLOBAL_HEADER_MENU_ID`). Consumers place a `<div :id="...">` in the
   * `header` slot; `AppMenu` mounts into it automatically.
   *
   * @default 'app-header-menu'
   */
  headerMenuEl?: string;
  /**
   * The id of the sider element that sider-level menus teleport into (对齐
   * `GLOBAL_SIDER_MENU_ID`). Consumers place a `<div :id="...">` in the
   * `sidebar` slot; `AppMenu` mounts into it automatically.
   *
   * @default 'app-sider-menu'
   */
  siderMenuEl?: string;
  /**
   * The width of the mix-mode child drawer in px (对齐 soybean-admin
   * `sider.mixChildMenuWidth`). Shared with `AppMenu` through the layout
   * context so the sider expands by the same amount when the drawer is pinned.
   *
   * @default 220
   */
  mixMenuWidth?: number;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<LayoutUi>;
}

/**
 * Events for the AppLayout component.
 */
export type AppLayoutEmits = LayoutCompactEmits;

/**
 * Slots for the AppLayout component.
 *
 * Mirrors the underlying `SLayout` slots (`sidebar`, `header`, `tab`,
 * `content`, `footer`, default) so callers can inject `AppMenu`, page chrome,
 * etc.
 */
export type AppLayoutSlots = LayoutCompactSlots;

export type { LayoutVariant, LayoutCollapsible };
