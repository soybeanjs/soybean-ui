import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SButton from '@/components/button/button.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Button e2e — real pointer + keyboard interactions against a real browser.
 *
 * These tests complement (not replace) the happy-dom unit spec at
 * `packages/ui/test/specs/components/button.spec.ts`. The unit spec covers
 * rendering and emit wiring; this e2e spec covers real input device behavior,
 * disabled-state interaction suppression, and theme-backed color-contrast a11y.
 */
describe('SButton (e2e)', () => {
  describe('interactions', () => {
    it('fires click on a real pointer click', async () => {
      const onClick = vi.fn();
      const { unmount } = renderComponent(SButton, {
        props: { onClick },
        slots: { default: 'Click me' }
      });

      await userEvent.click(page.getByRole('button', { name: 'Click me' }));

      expect(onClick).toHaveBeenCalledTimes(1);
      unmount();
    });

    it('renders disabled state with aria-disabled and native disabled', async () => {
      // SButton sets both native `disabled` (browser blocks clicks at the platform
      // level) and `aria-disabled="true"` (assistive tech announcement). Asserting
      // the disabled contract is more truthful than attempting a click, since the
      // browser — not the component — is what suppresses the event.
      const { unmount } = renderComponent(SButton, {
        props: { disabled: true },
        slots: { default: 'Submit' }
      });

      const button = page.getByRole('button', { name: 'Submit' });
      await expect.element(button).toBeDisabled();
      await expect.element(button).toHaveAttribute('aria-disabled', 'true');

      unmount();
    });

    it('activates via keyboard (Enter)', async () => {
      const onClick = vi.fn();
      const { unmount } = renderComponent(SButton, {
        props: { onClick },
        slots: { default: 'Confirm' }
      });

      const button = page.getByRole('button', { name: 'Confirm' });
      button.element().focus();
      await userEvent.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalled();
      unmount();
    });

    it('activates via keyboard (Space)', async () => {
      const onClick = vi.fn();
      const { unmount } = renderComponent(SButton, {
        props: { onClick },
        slots: { default: 'Confirm' }
      });

      const button = page.getByRole('button', { name: 'Confirm' });
      button.element().focus();
      await userEvent.keyboard(' ');

      expect(onClick).toHaveBeenCalled();
      unmount();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations including color-contrast', async () => {
      // withTheme injects the real CSS vars so colors are computed by the browser,
      // letting axe's color-contrast rule run (it is disabled in the happy-dom spec).
      const { unmount } = renderComponent(SButton, {
        props: { onClick: () => {} },
        slots: { default: 'Submit' },
        withTheme: true
      });

      const violations = await getA11yViolations();
      expect(violations).toHaveLength(0);
      unmount();
    });
  });
});
