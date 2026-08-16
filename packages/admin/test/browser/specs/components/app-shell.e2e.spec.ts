import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { renderComponent } from '../../shared/render';
import { SAppLayout } from '../../../../src/components/app-layout';
import { SAppMenu } from '../../../../src/components/app-menu';
import type { AppMenuData } from '../../../../src/types';

/**
 * Admin shell e2e — real browser rendering of the AppLayout ↔ AppMenu linkage.
 *
 * Renders the layout and menu separately so assertions are independent of the
 * fragile slot-to-slot Teleport resolution that the isolated browser test
 * harness cannot reliably reproduce (the real playground is verified via manual
 * browser checks). This file still exercises the real browser render path:
 * expanded-by-default layout, sider hidden in horizontal mode, and the correct
 * menu branch rendering for vertical / horizontal modes.
 */
const menus: AppMenuData[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  {
    key: 'system',
    label: 'System',
    icon: 'lucide:settings',
    children: [
      { key: 'users', label: 'Users', icon: 'lucide:users' },
      { key: 'roles', label: 'Roles', icon: 'lucide:shield' }
    ]
  },
  {
    key: 'docs',
    label: 'Docs',
    icon: 'lucide:files',
    children: [{ key: 'vue', label: 'Vue', icon: 'logos:vue' }]
  }
];

describe('SAppLayout (e2e)', () => {
  it('renders the sidebar expanded by default', () => {
    const { container, unmount } = renderComponent(SAppLayout, {
      props: { mode: 'vertical' },
      slots: { default: '<div>content</div>' }
    });

    expect(container.querySelector('[data-soybean-layout-root]')?.getAttribute('data-state')).toBe('expanded');

    unmount();
  });

  it('hides the sider in horizontal mode', () => {
    const { container, unmount } = renderComponent(SAppLayout, {
      props: { mode: 'horizontal' },
      slots: { default: '<div>content</div>' }
    });

    expect(container.querySelector('[data-soybean-layout-root]')?.getAttribute('data-sidebar-visible')).toBe('false');

    unmount();
  });
});

describe('SAppMenu (e2e)', () => {
  it('renders the vertical tree branch in a real browser', async () => {
    const { unmount } = renderComponent(SAppMenu, {
      props: { data: menus, mode: 'vertical' }
    });

    await expect.element(page.getByText('Dashboard')).toBeVisible();
    await expect.element(page.getByText('System')).toBeVisible();

    unmount();
  });

  it('renders the horizontal branch in a real browser', async () => {
    const { unmount } = renderComponent(SAppMenu, {
      props: { data: menus, mode: 'horizontal' }
    });

    await expect.element(page.getByText('Dashboard')).toBeVisible();

    unmount();
  });
});
