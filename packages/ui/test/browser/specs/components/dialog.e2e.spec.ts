import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SDialog from '@/components/dialog/dialog.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Dialog e2e — real open/close interactions against a real browser.
 *
 * The happy-dom dialog spec (`packages/ui/test/specs/components/dialog.spec.ts`)
 * verifies rendering and emit wiring with `portalProps: { disabled: true }` to
 * keep content inline. This e2e spec exercises the REAL portal behavior (content
 * teleports to `document.body`), focus management, and Escape-to-close.
 */
describe('SDialog (e2e)', () => {
  const slots = {
    trigger: '<button type="button">Open Dialog</button>',
    default: '<p>Dialog body text</p>'
  };

  it('opens on trigger click and reveals content in the portal', async () => {
    const { unmount } = renderComponent(SDialog, {
      props: { title: 'My Dialog' },
      slots
    });

    await userEvent.click(page.getByRole('button', { name: 'Open Dialog' }));

    await expect.element(page.getByRole('dialog')).toBeVisible();
    await expect.element(page.getByText('Dialog body text')).toBeVisible();
    await expect.element(page.getByText('My Dialog')).toBeVisible();

    unmount();
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    const { unmount } = renderComponent(SDialog, {
      props: { title: 'Closable' },
      slots
    });

    const trigger = page.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    // The dialog content leaves the portal; focus returns to the trigger.
    await expect.element(trigger).toBeFocused();

    unmount();
  });

  it('has no a11y violations when open (with theme)', async () => {
    const { unmount } = renderComponent(SDialog, {
      props: {
        open: true,
        title: 'Accessible Dialog',
        description: 'A description for screen readers'
      },
      slots,
      withTheme: true
    });

    const violations = await getA11yViolations();
    expect(violations).toHaveLength(0);
    unmount();
  });
});
