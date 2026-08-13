import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { page, userEvent } from 'vitest/browser';
import { SDropdownMenuWrapper } from '@/components/dropdown-menu';
import { SMenuOptions } from '@/components/menu';
import type { MenuOptionData } from '@/components/menu';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Menu e2e — real Teleport + keyboard navigation contract.
 *
 * The happy-dom unit spec (`packages/ui/test/specs/components/menu.spec.ts`)
 * disables the portal to keep content inline; this spec keeps the portal REAL
 * (open menus teleport to `document.body`) and exercises the keyboard
 * navigation contract happy-dom cannot faithfully reproduce: ArrowDown moves
 * roving focus, ArrowRight opens a submenu, Escape closes with focus restored
 * to the trigger.
 */
const items: MenuOptionData<string>[] = [
  { value: 'new-tab', label: 'New Tab' },
  {
    value: 'share',
    label: 'Share',
    children: [{ value: 'mail', label: 'Email' }]
  },
  { value: 'print', label: 'Print', disabled: true }
];

function renderMenu(withTheme = false) {
  return renderComponent(SDropdownMenuWrapper, {
    ...(withTheme ? { withTheme: true } : {}),
    slots: {
      trigger: () => h('button', { type: 'button' }, 'Open menu'),
      default: () => h(SMenuOptions, { items })
    }
  });
}

describe('SMenuOptions (e2e)', () => {
  it('opens the menu on trigger click and renders items in the real portal', async () => {
    const { unmount } = renderMenu();

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    // The open menu teleports to `document.body` — a real portal.
    await expect.element(page.getByRole('menu')).toBeVisible();
    await expect.element(page.getByRole('menuitem', { name: 'New Tab' })).toBeVisible();
    // Disabled menu items are still rendered (and inert).
    await expect.element(page.getByRole('menuitem', { name: 'Print' })).toBeVisible();

    unmount();
  });

  it('opens the menu with keyboard, moves focus with Arrow keys and opens a submenu', async () => {
    const { unmount } = renderMenu();

    // The trigger is a plain button: Tab lands on it, Enter opens the menu.
    await userEvent.tab();
    await expect.element(page.getByRole('button', { name: 'Open menu' })).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect.element(page.getByRole('menu')).toBeVisible();

    // Keyboard-open contract: focus moves into the menu's first item.
    const newTabItem = page.getByRole('menuitem', { name: 'New Tab' });
    await expect.element(newTabItem).toHaveFocus();

    // ArrowDown moves roving focus to the submenu trigger.
    await userEvent.keyboard('{ArrowDown}');
    const shareItem = page.getByRole('menuitem', { name: 'Share' });
    await expect.element(shareItem).toHaveFocus();

    // ArrowRight opens the submenu and moves focus into its first item.
    await userEvent.keyboard('{ArrowRight}');
    const subMenu = page.getByRole('menu').nth(1);
    await expect.element(subMenu).toBeVisible();
    await expect.element(page.getByRole('menuitem', { name: 'Email' })).toHaveFocus();

    unmount();
  });

  it('traps Tab inside the open menu (modal dropdown keeps focus contained)', async () => {
    const { unmount } = renderMenu();

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));
    await expect.element(page.getByRole('menu')).toBeVisible();

    // SDropdownMenuWrapper defaults to `modal: true`, so while open the menu is
    // a focus trap: Tab cycles through the popup (via focus guards) instead of
    // escaping to the page. If focus escaped, the dismissable layer would close
    // the menu on focus-outside.
    await userEvent.keyboard('{Tab}');

    // The menu is still open after Tab — focus never escaped to the page.
    await expect.element(page.getByRole('menu')).toBeVisible();

    unmount();
  });

  it('closes the menu on Escape and restores focus to the trigger', async () => {
    const { unmount } = renderMenu();

    const trigger = page.getByRole('button', { name: 'Open menu' });
    await userEvent.click(trigger);
    await expect.element(page.getByRole('menu')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();

    unmount();
  });

  it('has no a11y violations when a submenu is open (with theme)', async () => {
    const { unmount } = renderMenu(true);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));
    const shareItem = page.getByRole('menuitem', { name: 'Share' });
    await expect.element(shareItem).toBeVisible();
    await shareItem.hover();
    await expect.element(page.getByRole('menuitem', { name: 'Email' })).toBeVisible();

    // Real portal + real computed styles: color-contrast runs for real here.
    // `region` is a page-level best-practice rule: the bare test page has no
    // landmark elements, so it flags every component scanned from `body`.
    // `svg-img-alt` mirrors the project-wide exemption in
    // `packages/ui/test/shared/a11y.ts`: menu items render decorative chevron
    // icons as SVGs without aria-hidden, a rendering artifact rather than a
    // structural a11y issue.
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
