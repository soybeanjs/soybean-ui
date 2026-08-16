import type { AppLayoutMode } from '../../types';

/** Modes whose sider renders the first/second-level icon rail (对齐 soybean-admin mix 布局). */
export const RAIL_MODES: readonly AppLayoutMode[] = ['vertical-mix', 'vertical-hybrid', 'top-sidebar'];

/** Default expanded sider width for full-menu modes (对齐 soybean-admin `sider.width`). */
export const SIDER_WIDTH = 220;

/** Default collapsed sider width for full-menu modes (对齐 soybean-admin `sider.collapsedWidth`). */
export const SIDER_COLLAPSED_WIDTH = 64;

/** Default expanded sider width for rail modes (对齐 soybean-admin `sider.mixWidth`). */
export const RAIL_WIDTH = 90;

/** Default collapsed sider width for rail modes (对齐 soybean-admin `sider.mixCollapsedWidth`). */
export const RAIL_COLLAPSED_WIDTH = 64;

/** Default mix-mode child drawer width (对齐 soybean-admin `sider.mixChildMenuWidth`). */
export const MIX_MENU_WIDTH = 200;

/** Whether the mode renders an icon rail as the sider menu. */
export function isRailMode(mode: AppLayoutMode): boolean {
  return RAIL_MODES.includes(mode);
}
