import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SDrawer from '@/components/drawer/drawer.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Drawer e2e — real open/close interactions against a real browser.
 *
 * The happy-dom drawer spec (`packages/ui/test/specs/components/drawer.spec.ts`)
 * verifies rendering and emit wiring with `portalProps: { disabled: true }` to
 * keep content inline. This e2e spec exercises the REAL portal behavior (content
 * teleports to `document.body`), focus management, and Escape-to-close — the
 * same D7-19/D7-20 coverage as the dialog e2e spec.
 */
describe('SDrawer (e2e)', () => {
  const slots = {
    trigger: '<button type="button">Open Drawer</button>',
    default: '<p>Drawer body text</p>'
  };

  it('opens on trigger click and reveals content in the portal', async () => {
    const { unmount } = renderComponent(SDrawer, {
      props: { title: 'My Drawer' },
      slots
    });

    await userEvent.click(page.getByRole('button', { name: 'Open Drawer' }));

    await expect.element(page.getByRole('dialog')).toBeVisible();
    await expect.element(page.getByText('Drawer body text')).toBeVisible();
    await expect.element(page.getByText('My Drawer')).toBeVisible();

    unmount();
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    const { unmount } = renderComponent(SDrawer, {
      props: { title: 'Closable' },
      slots
    });

    const trigger = page.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    // The drawer content leaves the portal; focus returns to the trigger.
    await expect.element(trigger).toHaveFocus();

    unmount();
  });

  it('has no a11y violations when open (with theme)', async () => {
    const { unmount } = renderComponent(SDrawer, {
      props: {
        open: true,
        title: 'Accessible Drawer',
        description: 'A description for screen readers'
      },
      slots,
      withTheme: true
    });

    // `region` is a page-level best-practice rule: the bare test page has no
    // landmark elements, so it flags every component scanned from `body`.
    const violations = await getA11yViolations(undefined, {
      rules: { region: { enabled: false } }
    });
    expect(violations).toHaveLength(0);
    unmount();
  });
});
