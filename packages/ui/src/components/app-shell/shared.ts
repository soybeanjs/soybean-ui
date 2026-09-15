import type { LayoutCollapsible } from '@soybeanjs/headless/layout';
import type { PageTabsOptionData } from '@soybeanjs/headless/page-tabs';
import type { SplitNavMode } from '@soybeanjs/headless/split-nav';
import type { DataOrientation } from '@soybeanjs/headless/types';
import { splitNavPaneMetrics } from '@/styles/split-nav';
import { themeSizeMap, themeSizeRatio } from '@/theme';
import type { ThemeSize } from '@/theme';
import type { AppShellLogoPlacement, AppShellLogoPlacementResolved, AppShellMenuItem, AppShellMode } from './types';

/** `md` is the 1x reference of the theme size scale. */
const baseFontSize = themeSizeMap.md;

/**
 * Collapsed width of the nested vertical pane inside `SSplitNav`.
 *
 * `SSplitNav` sizes that pane as `collapsedWidth / 16` with no size scaling
 * (`useSplitNavTreePane`), so the shell has to reserve exactly this width when
 * it sizes the sidebar around the panes.
 */
export const splitNavCollapsedPaneWidth = 50;

/** Sidebar width the layout falls back to when the mode does not derive one. */
export const defaultSidebarWidth = 240;

/** Collapsed sidebar width the layout falls back to when the mode does not derive one. */
export const defaultCollapsedSidebarWidth = 50;

/**
 * Menu renderer a mode uses.
 *
 * `tree` is a nested `STreeMenu`, `nav` a popup `SNavMenu`, `split` an
 * `SSplitNav` whose panes are mounted per the mode skeleton.
 */
export type AppShellMenuRenderer = 'tree' | 'nav' | 'split';

/** Where the shell renders the menu instance. */
export type AppShellMenuPlacement = 'sidebar' | 'header';

/** Mount target the shell has to render for a mode. */
export type AppShellMountTarget = 'header' | 'sidebar';

/**
 * How a mode composes its sidebar.
 *
 * - `default` — the shell leaves the width to `SLayout` (a single nested tree).
 * - `rail` — only a first-level rail lives in the sidebar.
 * - `rail+pane` — a rail plus a nested pane that only exists while a first-level
 *   menu with children is active.
 * - `pane` — only a nested pane, no rail.
 */
export type AppShellSidebarComposition = 'default' | 'rail' | 'rail+pane' | 'pane';

/**
 * Skeleton of a shell mode: the layout regions plus where the menu goes.
 */
export interface AppShellSkeleton {
  /**
   * Layout orientation. `horizontal` keeps the sidebar full height beside the
   * header, `vertical` puts the header across the top with the sidebar under it.
   */
  orientation: DataOrientation;
  sidebarVisible: boolean;
  collapsible: LayoutCollapsible;
  logoPlacement: AppShellLogoPlacementResolved;
  renderer: AppShellMenuRenderer;
  /** Split shape, only set when `renderer` is `split`. */
  splitNavMode: SplitNavMode | undefined;
  menuPlacement: AppShellMenuPlacement;
  mounts: readonly AppShellMountTarget[];
  /** Sidebar composition, which decides how the width is derived. */
  sidebar: AppShellSidebarComposition;
}

/**
 * Live state of the nested menu pane, as far as the shell can observe it.
 */
export interface AppShellPaneState {
  /** Whether the nested pane currently has content to show. */
  hasPane: boolean;
  /** Whether the sidebar is collapsed. */
  collapsed: boolean;
}

/**
 * Derived sidebar widths of the current shell state.
 */
export interface AppShellWidths {
  /** Sidebar width in pixels; `undefined` keeps the `SLayout` default. */
  sidebarWidth: number | undefined;
  /** Collapsed sidebar width in pixels; `undefined` keeps the `SLayout` default. */
  collapsedSidebarWidth: number | undefined;
}

/**
 * Convert a rem target into the pixel input `LayoutRoot` re-scales by size,
 * so `pxToRem(toLayoutPx(rem, size), size)` returns the original rem.
 */
function toLayoutPx(rem: number, size: ThemeSize): number {
  return (rem * baseFontSize) / themeSizeRatio[size];
}

interface SplitPaneWidth {
  /** First-level rail width, in pixels. */
  rail: number;
  /** Nested tree pane width, in pixels. */
  tree: number;
}

function resolveSplitPaneWidth(size: ThemeSize): SplitPaneWidth {
  const { rail, tree } = splitNavPaneMetrics[size];

  return {
    rail: toLayoutPx(rail, size),
    tree: toLayoutPx(tree, size)
  };
}

/**
 * Skeleton of every shell mode.
 *
 * The three teleporting split modes place their menu inside the sidebar region:
 * `SSplitNav` renders only teleported panes there, and the sidebar slot is the
 * one place that exposes the live collapsed state the menu has to follow.
 *
 * Widths are derived from `sidebar` by `resolveShellWidths` instead of being
 * stored here: a nested pane only takes space while a first-level menu with
 * children is active, so a per-mode constant would reserve an empty column.
 */
export const appShellSkeletons: Readonly<Record<AppShellMode, AppShellSkeleton>> = {
  sidebar: {
    orientation: 'horizontal',
    sidebarVisible: true,
    collapsible: 'icon',
    logoPlacement: 'sidebar',
    renderer: 'tree',
    splitNavMode: undefined,
    menuPlacement: 'sidebar',
    mounts: [],
    sidebar: 'default'
  },
  top: {
    orientation: 'vertical',
    sidebarVisible: false,
    collapsible: 'icon',
    logoPlacement: 'header',
    renderer: 'nav',
    splitNavMode: undefined,
    menuPlacement: 'header',
    mounts: [],
    sidebar: 'default'
  },
  'dual-vertical': {
    orientation: 'horizontal',
    sidebarVisible: true,
    collapsible: 'icon',
    logoPlacement: 'sidebar',
    renderer: 'split',
    splitNavMode: 'dual-vertical',
    menuPlacement: 'sidebar',
    mounts: [],
    sidebar: 'rail+pane'
  },
  'vertical-horizontal': {
    orientation: 'horizontal',
    sidebarVisible: true,
    collapsible: 'offcanvas',
    logoPlacement: 'header',
    renderer: 'split',
    splitNavMode: 'vertical-horizontal',
    menuPlacement: 'sidebar',
    mounts: ['header', 'sidebar'],
    sidebar: 'rail'
  },
  'horizontal-vertical': {
    orientation: 'vertical',
    sidebarVisible: true,
    collapsible: 'icon',
    logoPlacement: 'header',
    renderer: 'split',
    splitNavMode: 'horizontal-vertical',
    menuPlacement: 'sidebar',
    mounts: ['header', 'sidebar'],
    sidebar: 'pane'
  },
  'horizontal-dual-vertical': {
    orientation: 'vertical',
    sidebarVisible: true,
    collapsible: 'icon',
    logoPlacement: 'header',
    renderer: 'split',
    splitNavMode: 'horizontal-dual-vertical',
    menuPlacement: 'sidebar',
    mounts: ['header', 'sidebar'],
    sidebar: 'rail+pane'
  }
};

/**
 * Whether a mode's sidebar hosts a nested vertical pane.
 */
export function modeHasNestedPane(mode: AppShellMode): boolean {
  const { sidebar } = appShellSkeletons[mode];

  return sidebar === 'rail+pane' || sidebar === 'pane';
}

/**
 * Resolve the sidebar widths for the current pane state, letting explicit
 * overrides win.
 *
 * A collapsed sidebar keeps only what it owns: the nested pane turns into an
 * overlay, so it must not widen the layout.
 */
export function resolveShellWidths(
  mode: AppShellMode,
  size: ThemeSize,
  pane: AppShellPaneState,
  override: Partial<AppShellWidths> = {}
): AppShellWidths {
  const { sidebar } = appShellSkeletons[mode];

  if (sidebar === 'default') {
    return {
      sidebarWidth: override.sidebarWidth,
      collapsedSidebarWidth: override.collapsedSidebarWidth
    };
  }

  const { rail, tree } = resolveSplitPaneWidth(size);
  const paneWidth = pane.hasPane ? tree : 0;

  if (sidebar === 'rail') {
    return {
      sidebarWidth: override.sidebarWidth ?? rail,
      collapsedSidebarWidth: override.collapsedSidebarWidth
    };
  }

  if (sidebar === 'pane') {
    return {
      sidebarWidth: override.sidebarWidth ?? (pane.collapsed ? 0 : paneWidth),
      collapsedSidebarWidth: override.collapsedSidebarWidth ?? 0
    };
  }

  return {
    sidebarWidth: override.sidebarWidth ?? (pane.collapsed ? rail : rail + paneWidth),
    collapsedSidebarWidth: override.collapsedSidebarWidth ?? rail
  };
}

/**
 * Resolve the logo placement of a mode.
 */
export function resolveLogoPlacement(
  mode: AppShellMode,
  placement: AppShellLogoPlacement
): AppShellLogoPlacementResolved {
  if (placement === 'auto') {
    return appShellSkeletons[mode].logoPlacement;
  }

  return placement;
}

/**
 * Build the pixel-to-rem converter the shell shares with every region it sizes.
 *
 * Mirrors the `SLayout` default (`themeSizeRatio[size] / themeSizeMap.md`) so
 * the layout, the tree menu, and the derived split widths all agree.
 */
export function createPxToRem(size: ThemeSize): (px: number) => number {
  return (px: number) => (px * themeSizeRatio[size]) / baseFontSize;
}

/**
 * Drop `hidden` items from a menu tree.
 *
 * The tree-based renderers filter hidden options themselves; `SNavMenu` (the
 * `top` mode) does not, so the shell filters before handing the tree over and
 * `hidden` behaves the same in every mode.
 */
export function filterVisibleMenuItems(items: readonly AppShellMenuItem[]): AppShellMenuItem[] {
  return items
    .filter(item => !item.hidden)
    .map(item => (item.children ? { ...item, children: filterVisibleMenuItems(item.children) } : item));
}

/**
 * Menu nodes from the root down to `value`, or an empty trail when not found.
 *
 * Hidden nodes are kept: a hidden menu can still be the active route, and the
 * breadcrumb has to show where it sits.
 */
export function findMenuTrail(items: readonly AppShellMenuItem[], value: string | undefined): AppShellMenuItem[] {
  if (!value) {
    return [];
  }

  for (const item of items) {
    if (item.value === value) {
      return [item];
    }

    const childTrail = findMenuTrail(item.children ?? [], value);

    if (childTrail.length) {
      return [item, ...childTrail];
    }
  }

  return [];
}

/**
 * Find a menu node by value.
 */
export function findMenuItem(
  items: readonly AppShellMenuItem[],
  value: string | undefined
): AppShellMenuItem | undefined {
  return findMenuTrail(items, value).at(-1);
}

/**
 * Whether a node has at least one visible child.
 *
 * An `undefined` node has no children, which keeps callers free of null checks
 * when they ask about an optional active item.
 */
export function hasVisibleChild(item: AppShellMenuItem | undefined): boolean {
  return Boolean(item?.children?.some(child => !child.hidden));
}

/**
 * Narrow a `SPageTabs` `click` / `contextmenu` payload to the tab data.
 *
 * Vue types the listener of a single-root component as the intersection of the
 * declared emit and the native DOM handler, so the shell has to accept both
 * shapes. The runtime payload is always the tab — the emit name is declared, so
 * it never doubles as a native attr — and the guard keeps that assumption from
 * being an unchecked cast.
 */
export function isPageTabsPayload(payload: PageTabsOptionData | Event): payload is PageTabsOptionData {
  return !(payload instanceof Event);
}
