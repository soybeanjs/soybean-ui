import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import type { VNodeChild } from 'vue';
import { page, userEvent } from 'vitest/browser';
import SAppShell from '@/components/app-shell/app-shell.vue';
import type { AppShellProps } from '@/components/app-shell/types';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * AppShell e2e — real layout geometry, real Teleport, and real color-contrast.
 *
 * The happy-dom unit spec covers the mode skeletons, emit wiring, and the
 * derived width values. This spec covers what happy-dom cannot: that the layout
 * sidebar actually measures up to the split-nav panes it wraps, that teleported
 * panes land inside the layout regions, that the mobile drawer is a real
 * portal, and that the themed shell has no color-contrast violations.
 *
 * The shell fills its container (`h-full`), so every scene mounts it inside a
 * fixed-size harness; the viewport is widened because the layout hides the
 * sidebar below `md`.
 */
const items = [
  {
    value: 'overview',
    label: 'Overview',
    icon: 'lucide:layout-dashboard'
  },
  {
    value: 'workbench',
    label: 'Workbench',
    icon: 'lucide:layout-grid',
    children: [
      {
        value: 'projects',
        label: 'Projects',
        icon: 'lucide:folder-kanban'
      },
      {
        value: 'tasks',
        label: 'Tasks',
        icon: 'lucide:list-todo'
      }
    ]
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: 'lucide:settings'
  }
];

const breadcrumbs = [
  {
    value: 'home',
    label: 'Home'
  },
  {
    value: 'overview',
    label: 'Overview'
  }
];

function createHarness(
  props: AppShellProps,
  slots?: Record<string, () => VNodeChild>,
  handlers: Record<string, (value: string) => void> = {}
) {
  return defineComponent({
    name: 'AppShellHarness',
    setup() {
      return () => h('div', { style: 'height: 700px' }, h(SAppShell, { ...props, ...handlers }, slots));
    }
  });
}

function element(selector: string): Element {
  const found = document.querySelector(selector);

  if (!found) {
    throw new Error(`expected "${selector}" to be rendered`);
  }

  return found;
}

function query(selector: string): Element | null {
  return document.querySelector(selector);
}

/**
 * Wait for running CSS transitions to finish.
 *
 * The sidebar animates its width, so measuring right after mount can read a
 * half-applied layout. Infinite animations are skipped and a 500ms timeout
 * bounds the wait, mirroring the a11y helper.
 */
interface PaneGeometry {
  width: number;
  left: number;
  position: string;
  state: string | null;
}

interface ShellGeometry {
  /** `null` in the rail-less modes (`horizontal-vertical`). */
  railWidth: number | null;
  sidebarWidth: number;
  sidebarRight: number;
  pane: PaneGeometry | null;
}

function requireGeometry(value: number | null, what: string): number {
  if (value === null) {
    throw new Error(`expected ${what} to be rendered`);
  }

  return value;
}

/**
 * Read every box the geometry assertions need in one synchronous pass.
 *
 * Measuring piecemeal lets an async icon load shift the layout between two
 * reads, which shows up as an off-by-a-few-pixels flake under parallel load;
 * one pass keeps the numbers internally consistent.
 */
function geometry(): ShellGeometry {
  const railElement = query('[data-soybean-split-nav-vertical-first-level]');
  const rail = railElement?.getBoundingClientRect();
  const sidebar = element('[data-soybean-app-shell-sidebar]').getBoundingClientRect();
  const paneElement = query('[data-soybean-split-nav-sub-vertical]');
  const paneRect = paneElement?.getBoundingClientRect();

  return {
    railWidth: rail?.width ?? null,
    sidebarWidth: sidebar.width,
    sidebarRight: sidebar.right,
    pane:
      paneElement && paneRect
        ? {
            width: paneRect.width,
            left: paneRect.left,
            position: getComputedStyle(paneElement).position,
            state: paneElement.getAttribute('data-state')
          }
        : null
  };
}

/** Integer-pixel key of the current geometry, so sub-pixel jitter cannot defeat the wait. */
function geometryKey(): string {
  const snapshot = geometry();

  return [
    snapshot.railWidth === null ? 'no-rail' : Math.round(snapshot.railWidth),
    Math.round(snapshot.sidebarWidth),
    Math.round(snapshot.sidebarRight),
    snapshot.pane
      ? [
          Math.round(snapshot.pane.width),
          Math.round(snapshot.pane.left),
          snapshot.pane.position,
          snapshot.pane.state
        ].join(',')
      : 'no-pane'
  ].join('|');
}

/**
 * Wait until the shell's geometry stops moving.
 *
 * The layout animates its width on first paint (the theme default gives way to
 * the derived width), so a measurement taken too early reads a half-applied
 * layout — invisible on an idle machine, reproducible under parallel load.
 * Polling for stable consecutive samples is robust to a transition that has not
 * started yet, unlike waiting on `document.getAnimations()`.
 */
async function waitForStableGeometry(): Promise<void> {
  let previous = geometryKey();
  let stableSamples = 0;

  await expect
    .poll(
      () => {
        const current = geometryKey();

        stableSamples = current === previous ? stableSamples + 1 : 0;
        previous = current;

        return stableSamples >= 2;
      },
      { timeout: 3000, interval: 60 }
    )
    .toBe(true);
}

describe('SAppShell (e2e)', () => {
  beforeEach(async () => {
    await page.viewport(1280, 900);
  });

  describe('sidebar geometry', () => {
    it('sizes the expanded sidebar to the split-nav panes', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'dual-vertical', modelValue: 'projects' })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Overview' })).toBeVisible();
      await waitForStableGeometry();

      const { railWidth, sidebarWidth, pane } = geometry();

      if (!pane) {
        throw new Error('expected the nested pane to be rendered');
      }

      expect(pane.width).toBeGreaterThan(0);
      expect(
        Math.abs(requireGeometry(railWidth, 'the first-level rail') + pane.width - sidebarWidth)
      ).toBeLessThanOrEqual(1);

      unmount();
    });

    it('keeps only the rail while the active menu has no children', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'dual-vertical', modelValue: 'overview' })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Overview' })).toBeVisible();
      await waitForStableGeometry();

      const { railWidth, sidebarWidth, pane } = geometry();

      // The nested pane has nothing to show, so it must not reserve a column.
      expect(pane).toBeNull();
      expect(Math.abs(sidebarWidth - requireGeometry(railWidth, 'the first-level rail'))).toBeLessThanOrEqual(1);

      unmount();
    });

    it('overlays the pane next to the rail while the sidebar is collapsed', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'dual-vertical', modelValue: 'projects', defaultOpen: false })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Overview' })).toBeVisible();
      await waitForStableGeometry();

      const { railWidth, sidebarWidth, sidebarRight, pane } = geometry();

      if (!pane) {
        throw new Error('expected the nested pane to be rendered');
      }

      const rail = requireGeometry(railWidth, 'the first-level rail');

      expect(pane.position).toBe('absolute');
      expect(Math.abs(sidebarWidth - rail)).toBeLessThanOrEqual(1);
      // Anchored to the rail's outer edge at the full tree width, not squeezed into it.
      expect(Math.abs(pane.left - sidebarRight)).toBeLessThanOrEqual(1);
      expect(pane.width).toBeGreaterThan(rail);

      unmount();
    });

    it('sizes the sidebar to the nested tree pane for horizontal-vertical', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'horizontal-vertical', modelValue: 'projects' })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Workbench' })).toBeVisible();
      await waitForStableGeometry();

      const { sidebarWidth, pane } = geometry();

      if (!pane) {
        throw new Error('expected the nested pane to be rendered');
      }

      expect(Math.abs(pane.width - sidebarWidth)).toBeLessThanOrEqual(1);

      unmount();
    });
  });

  describe('teleport', () => {
    it('mounts the horizontal pane in the header and the vertical pane in the sidebar', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'horizontal-vertical', modelValue: 'projects' })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Workbench' })).toBeVisible();

      expect(query('[data-soybean-layout-header] [data-soybean-split-nav-horizontal-first-level]')).not.toBeNull();
      expect(query('[data-soybean-app-shell-sidebar] [data-soybean-split-nav-sub-vertical]')).not.toBeNull();

      unmount();
    });

    it('mounts both vertical panes of horizontal-dual-vertical in the sidebar', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'horizontal-dual-vertical', modelValue: 'projects' })
      );

      await expect.element(page.getByRole('menuitem', { name: 'Workbench' })).toBeVisible();

      const sidebar = query('[data-soybean-app-shell-sidebar]');

      expect(query('[data-soybean-layout-header] [data-soybean-split-nav-horizontal-first-level]')).not.toBeNull();
      expect(sidebar?.querySelector('[data-soybean-split-nav-dual-vertical]')).not.toBeNull();
      expect(sidebar?.querySelector('[data-soybean-split-nav-vertical-first-level]')).not.toBeNull();

      unmount();
    });
  });

  describe('top menu', () => {
    /**
     * Regression guard: the layout root carries `data-orientation` too, so a
     * bare `group` on it used to flip this list to a column in `top` mode.
     */
    it('lays the menu bar out as a row inside the header', async () => {
      const { unmount } = await renderComponent(createHarness({ items, mode: 'top' }));

      const list = element('[data-soybean-nav-menu-list]');

      await expect.element(page.getByText('Overview')).toBeVisible();

      // No sidebar in this mode, so the geometry wait does not apply here.
      expect(getComputedStyle(list).flexDirection).toBe('row');
      expect(list.getBoundingClientRect().height).toBeLessThanOrEqual(
        element('[data-soybean-layout-header]').getBoundingClientRect().height + 1
      );

      unmount();
    });
  });

  describe('breadcrumb', () => {
    /**
     * `top` mode keeps the menu in anchor-based `SNavMenu`, so the ancestor
     * crumb is the only button carrying the label.
     */
    it('opens the sibling menu from an ancestor crumb and activates it', async () => {
      const onUpdate = vi.fn();
      const { unmount } = await renderComponent(
        createHarness({ items, mode: 'top', modelValue: 'projects' }, undefined, { 'onUpdate:modelValue': onUpdate })
      );

      const trigger = page.getByRole('button', { name: 'Workbench' });

      await expect.element(trigger).toBeVisible();
      await userEvent.click(trigger);

      const sibling = page.getByRole('menuitem', { name: 'Tasks' });

      await expect.element(sibling).toBeVisible();
      await userEvent.click(sibling);

      expect(onUpdate).toHaveBeenCalledWith('tasks');

      unmount();
    });
  });

  describe('mobile drawer', () => {
    it('opens the sidebar in a real dialog', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, isMobile: true }, { logo: () => h('span', { 'data-shell-logo': '' }, 'Logo') })
      );

      const trigger = page.getByRole('button', { name: 'Toggle Sidebar' });

      await expect.element(trigger).toBeVisible();
      await userEvent.click(trigger);

      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByRole('treeitem', { name: 'Overview' })).toBeVisible();
      expect(query('[data-soybean-layout-mobile] [data-shell-logo]')).not.toBeNull();
      await expect.element(page.getByText('Logo')).toBeVisible();

      unmount();
    });
  });

  describe('accessibility', () => {
    /**
     * Two known upstream gaps keep this scene to the shell's own chrome:
     *
     * - `SPageTabs` paints the selected tab as `text-primary` on `bg-primary-50`
     *   (3.99:1 with the default indigo palette) — a page-tabs color issue.
     * - The layout sidebar is a plain `div` with no landmark, so anything the
     *   shell injects around the menu (the logo slot, `sidebar-start` /
     *   `sidebar-end`) sits outside a landmark and trips axe's `region` rule.
     *   Landmarks belong to the headless layout family, not to this UI wrapper.
     */
    it('has no axe violations including color-contrast', async () => {
      const { unmount } = await renderComponent(
        createHarness({ items, breadcrumbs }, { footer: () => h('span', 'Footer') }),
        { withTheme: true }
      );

      const violations = await getA11yViolations();

      expect(violations.map(violation => `${violation.id}: ${violation.nodes[0]?.html ?? ''}`)).toEqual([]);

      unmount();
    });
  });
});
