import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SSplitNav from '@/components/split-nav/split-nav.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * SplitNav e2e — real RovingFocus keyboard + Teleport against a real browser.
 *
 * The happy-dom unit spec covers rendering, emit wiring, disabled items, and
 * Teleport structure. This spec covers first-level Arrow/Enter navigation and
 * theme-backed color-contrast a11y that happy-dom cannot faithfully reproduce.
 * ArrowLeft/ArrowRight on a vertical parent open the nested pane without selecting it.
 */
const items = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'workspace',
    label: 'Workspace',
    children: [
      { value: 'projects', label: 'Projects' },
      { value: 'tasks', label: 'Tasks' }
    ]
  },
  {
    value: 'settings',
    label: 'Settings'
  }
];

describe('SSplitNav (e2e)', () => {
  describe('keyboard', () => {
    it('moves first-level focus with ArrowDown and opens a parent with Enter', async () => {
      const { unmount } = renderComponent(SSplitNav, {
        props: { items, mode: 'dual-vertical' }
      });

      const overview = page.getByRole('menuitem', { name: 'Overview' });
      await expect.element(overview).toBeVisible();

      overview.element().focus();
      await userEvent.keyboard('{ArrowDown}');

      const workspace = page.getByRole('menuitem', { name: 'Workspace' });
      await expect.element(workspace).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await expect.element(workspace).toHaveAttribute('data-state', 'open');
      await expect.element(page.getByText('Projects')).toBeVisible();
      await expect.element(page.getByText('Tasks')).toBeVisible();

      unmount();
    });

    it('opens a vertical first-level parent with ArrowRight without selecting it', async () => {
      const { unmount } = renderComponent(SSplitNav, {
        props: { items, mode: 'dual-vertical' }
      });

      const workspace = page.getByRole('menuitem', { name: 'Workspace' });
      workspace.element().focus();
      await userEvent.keyboard('{ArrowRight}');

      await expect.element(workspace).toHaveAttribute('data-state', 'open');
      await expect.element(page.getByText('Projects')).toBeVisible();

      unmount();
    });
  });

  describe('teleport', () => {
    it('renders the dual-vertical pane inside the vertical mount target', async () => {
      const sider = document.createElement('div');
      sider.id = 'split-nav-e2e-sider';
      document.body.append(sider);

      const { unmount } = renderComponent(SSplitNav, {
        props: {
          items,
          mode: 'dual-vertical',
          modelValue: 'workspace',
          verticalMountedId: 'split-nav-e2e-sider'
        }
      });

      await expect.element(page.getByRole('menuitem', { name: 'Workspace' })).toBeVisible();
      expect(sider.querySelector('[data-soybean-split-nav-dual-vertical]')).toBeTruthy();
      expect(sider.querySelector('[data-soybean-split-nav-vertical-first-level]')).toBeTruthy();
      expect(sider.querySelector('[data-soybean-split-nav-sub-vertical]')).toBeTruthy();

      unmount();
      sider.remove();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations including color-contrast', async () => {
      const { unmount } = renderComponent(SSplitNav, {
        props: { items, modelValue: 'workspace' },
        withTheme: true
      });

      const violations = await getA11yViolations();

      expect(violations).toHaveLength(0);

      unmount();
    });
  });
});
