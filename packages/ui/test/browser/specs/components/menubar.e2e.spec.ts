import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import type { MenuOptionData } from '@/components/menu';
import SMenubar from '@/components/menubar/menubar.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Menubar e2e — real Teleport + roving focus + keyboard navigation contract.
 *
 * The happy-dom unit spec (`packages/ui/test/specs/components/menubar.spec.ts`)
 * verifies rendering, emit wiring, and disabled resolution with the portal
 * disabled to keep content inline. This spec keeps the portal REAL (open menus
 * teleport to `document.body`) and exercises the keyboard navigation contract
 * that happy-dom cannot faithfully reproduce: roving focus across triggers,
 * ArrowDown/Enter to open, and Escape to close with focus restored to the
 * trigger.
 */
const items: MenuOptionData<string>[] = [
  {
    value: 'file',
    label: 'File',
    children: [
      { value: 'new-tab', label: 'New Tab' },
      { value: 'print', label: 'Print', disabled: true }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [{ value: 'undo', label: 'Undo' }]
  },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/soybean-ui'
  }
];

describe('SMenubar (e2e)', () => {
  it('opens the menu on trigger click and renders items in the real portal', async () => {
    const { unmount } = renderComponent(SMenubar, { props: { items } });

    await userEvent.click(page.getByRole('menuitem', { name: 'File' }));

    // The open menu teleports to `document.body` — a real portal.
    await expect.element(page.getByRole('menu')).toBeVisible();
    await expect.element(page.getByRole('menuitem', { name: 'New Tab' })).toBeVisible();
    // Disabled menu items are still rendered (and inert).
    await expect.element(page.getByRole('menuitem', { name: 'Print' })).toBeVisible();

    unmount();
  });

  it('moves roving focus across triggers with Arrow keys and opens via keyboard', async () => {
    const { unmount } = renderComponent(SMenubar, { props: { items } });

    // The menubar exposes a single tab stop (roving focus): Tab lands on the
    // first trigger, ArrowRight moves to the next.
    await userEvent.tab();
    const fileTrigger = page.getByRole('menuitem', { name: 'File' });
    await expect.element(fileTrigger).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    const editTrigger = page.getByRole('menuitem', { name: 'Edit' });
    await expect.element(editTrigger).toHaveFocus();

    // ArrowDown opens the menu and moves focus into its content (keyboard-open
    // contract; pointer-open keeps focus on the trigger instead).
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(page.getByRole('menu')).toBeVisible();
    await expect.element(page.getByRole('menuitem', { name: 'Undo' })).toHaveFocus();

    unmount();
  });

  it('closes the menu on Escape and restores focus to the trigger', async () => {
    const { unmount } = renderComponent(SMenubar, { props: { items } });

    const fileTrigger = page.getByRole('menuitem', { name: 'File' });
    await userEvent.click(fileTrigger);
    await expect.element(page.getByRole('menu')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    await expect.element(fileTrigger).toHaveFocus();

    unmount();
  });

  it('has no a11y violations when a menu is open (with theme)', async () => {
    const { unmount } = renderComponent(SMenubar, { props: { items }, withTheme: true });

    await userEvent.click(page.getByRole('menuitem', { name: 'File' }));
    await expect.element(page.getByRole('menu')).toBeVisible();

    // Real portal + real computed styles: color-contrast runs for real here.
    // `region` is a page-level best-practice rule: the bare test page has no
    // landmark elements, so it flags every component scanned from `body` (the
    // same pre-existing noise affects the select/dialog e2e specs).
    // `svg-img-alt` mirrors the project-wide exemption in
    // `packages/ui/test/shared/a11y.ts`: menu items render decorative chevron /
    // check icons as SVGs without aria-hidden, a rendering artifact rather than
    // a structural a11y issue.
    const violations = await getA11yViolations(undefined, {
      rules: {
        region: { enabled: false },
        'svg-img-alt': { enabled: false }
      }
    });
    expect(violations).toHaveLength(0);

    unmount();
  });
});
