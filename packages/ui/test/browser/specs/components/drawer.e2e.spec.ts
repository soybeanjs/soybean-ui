import { describe, expect, it } from 'vitest';
import { h } from 'vue';
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

  const popupElement = () => {
    const found = document.querySelector<HTMLElement>('[data-soybean-drawer-popup]');

    if (!found) {
      throw new Error('expected the drawer popup to be rendered');
    }

    return found;
  };

  /**
   * Wait until the enter animation has parked the panel on its anchored edge.
   *
   * The panel slides in from that edge, so measuring straight after `open` reads
   * a box that is still translated off-screen.
   */
  async function waitForPanelToSettle(): Promise<void> {
    const height = document.documentElement.clientHeight;

    await expect
      .poll(() => {
        const box = popupElement().getBoundingClientRect();

        return box.top >= -1 && box.bottom <= height + 1;
      })
      .toBe(true);
  }

  it('opens on trigger click and reveals content in the portal', async () => {
    const { unmount } = await renderComponent(SDrawer, {
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
    const { unmount } = await renderComponent(SDrawer, {
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

  describe('fullscreen', () => {
    it('fills the viewport from its edge even with snap points configured', async () => {
      await page.viewport(1024, 768);

      const { unmount } = await renderComponent(SDrawer, {
        props: {
          open: true,
          fullscreen: true,
          side: 'bottom',
          snapPoints: [0.5, 1],
          title: 'Fullscreen Drawer'
        },
        slots: { default: () => h('p', 'Drawer body text') }
      });

      await waitForPanelToSettle();

      const height = document.documentElement.clientHeight;

      // The 0.5 snap point would rest the panel halfway down the viewport and
      // push the half beyond the anchored edge off-screen; fullscreen defines the
      // size, so snapping has to yield to it.
      await expect.poll(() => Math.round(popupElement().getBoundingClientRect().top)).toBeLessThan(1);
      await expect
        .poll(() => Math.round(popupElement().getBoundingClientRect().height))
        .toBeGreaterThanOrEqual(height - 1);
      expect(popupElement().getAttribute('data-soybean-snap-points')).toBe('false');

      unmount();
    });

    it('still rests on a snap level without fullscreen', async () => {
      await page.viewport(1024, 768);

      const { unmount } = await renderComponent(SDrawer, {
        props: { open: true, side: 'bottom', snapPoints: [0.5, 1], title: 'Snapped Drawer' },
        slots: { default: () => h('p', 'Drawer body text') }
      });

      await waitForPanelToSettle();

      // Guard for the assertion above: this is what the panel does when snapping
      // is genuinely active.
      expect(popupElement().getAttribute('data-soybean-snap-points')).toBe('true');
      expect(Math.round(popupElement().getBoundingClientRect().top)).toBeGreaterThan(1);

      unmount();
    });
  });

  it('synchronizes the trigger aria-controls with the popup id', async () => {
    const { unmount } = await renderComponent(SDrawer, {
      props: { title: 'ARIA Drawer' },
      slots
    });

    await userEvent.click(page.getByRole('button', { name: 'Open Drawer' }));
    await expect.element(page.getByRole('dialog')).toBeVisible();

    const trigger = document.querySelector('[data-soybean-drawer-trigger]');
    const popup = document.querySelector('[data-soybean-drawer-popup]');

    expect(trigger?.getAttribute('aria-controls')).toBe(popup?.getAttribute('id'));
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');

    unmount();
  });

  it('has no a11y violations when open (with theme)', async () => {
    const { unmount } = await renderComponent(SDrawer, {
      props: {
        open: true,
        title: 'Accessible Drawer',
        description: 'A description for screen readers',
        // The shared solid-primary mini button (dialog/drawer confirm) sits at
        // ~4.28:1 contrast on the default theme — below the 4.5:1 AA threshold
        // at its 12px font size. That is a global theme-token issue outside the
        // drawer's contract, tracked separately; this scan covers the drawer's
        // own surface (roles, labels, handle, close button).
        showConfirm: false
      },
      // Function slots: the themed render path forwards slots straight into
      // `h()`, where string values would degrade to literal text nodes.
      slots: {
        trigger: () => h('button', { type: 'button' }, 'Open Drawer'),
        default: () => h('p', 'Drawer body text')
      },
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
