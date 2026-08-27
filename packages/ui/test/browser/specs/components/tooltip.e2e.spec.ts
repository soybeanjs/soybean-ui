import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import STooltip from '@/components/tooltip/tooltip.vue';
import { renderComponent } from '../../shared/render';

/**
 * Tooltip e2e — real pointer hover + real portal, plus the cross-tooltip
 * coordination broadcast.
 *
 * Tooltips are inherently browser-dependent: they open on a real `pointermove`
 * hover and teleport their content into `document.body`. The happy-dom unit
 * spec (`packages/ui/test/specs/components/tooltip.spec.ts`) cannot reproduce
 * either reliably.
 *
 * The coordination scenario pins a specific regression: `TooltipPositionerImpl`
 * listens for the `tooltip.open` broadcast on `document` (not `window`), so two
 * independent, non-controlled tooltips coordinate — opening the second must
 * close the first. `userEvent.hover` drives the first open (real pointer) and
 * keyboard focus drives the second, so the pointer never leaves the first
 * trigger and the first closes *only* because of the broadcast.
 *
 * Note on locators: the semantic `role="tooltip"` element is a `VisuallyHidden`
 * span that is `aria-hidden`, so its accessible name is empty and role-name
 * filtering cannot distinguish two tooltips. The visible popup content has no
 * semantic role, so each tooltip's content carries a `data-testid` — the rare
 * no-role case where a testid is the right tool.
 */
/**
 * The host div needs vertical breathing room above the triggers: with the
 * buttons flush against the viewport top edge, a `side="top"` tooltip has no
 * space to open into and floats over its own trigger, swallowing the hover
 * point (real-browser flip/collision behavior we don't want to assert
 * against).
 */
function renderTwoTooltips() {
  return renderComponent({
    name: 'TwoTooltips',
    components: { STooltip },
    template: `
      <div style="margin-top: 48px">
        <STooltip :delay-duration="0">
          <template #trigger><button type="button">Hover A</button></template>
          <span data-testid="tooltip-a">Tooltip A</span>
        </STooltip>
        <STooltip :delay-duration="0">
          <template #trigger><button type="button">Hover B</button></template>
          <span data-testid="tooltip-b">Tooltip B</span>
        </STooltip>
      </div>
    `
  });
}

describe('STooltip (e2e)', () => {
  it('opens on hover and reveals its content in the real portal', async () => {
    const { unmount } = renderTwoTooltips();

    await userEvent.hover(page.getByRole('button', { name: 'Hover A' }));

    await expect.element(page.getByTestId('tooltip-a')).toBeVisible();

    unmount();
  });

  it('closes the first tooltip when a second independent tooltip opens (broadcast)', async () => {
    const { unmount } = renderTwoTooltips();

    const triggerA = page.getByRole('button', { name: 'Hover A' });
    const triggerB = page.getByRole('button', { name: 'Hover B' });

    // Open the first tooltip by hovering its trigger (real pointer).
    await userEvent.hover(triggerA);
    await expect.element(page.getByTestId('tooltip-a')).toBeVisible();
    await expect.element(page.getByTestId('tooltip-b')).not.toBeInTheDocument();

    // Open the second by focusing its trigger — the mouse stays on A, so A only
    // closes because the root broadcasts `tooltip.open` on `document` when B
    // opens and A's positioner listens for it.
    await triggerB.element().focus();
    await expect.element(page.getByTestId('tooltip-b')).toBeVisible();
    await expect.element(page.getByTestId('tooltip-a')).not.toBeInTheDocument();

    unmount();
  });
});
