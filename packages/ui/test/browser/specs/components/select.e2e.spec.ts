import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SSelect from '@/components/select/select.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Select e2e — exercises the REAL ResizeObserver, pointer capture, and
 * scrollIntoView that the happy-dom select spec
 * (`packages/ui/test/specs/components/select.spec.ts`) has to mock.
 *
 * No mocks here. `userEvent.click` dispatches real pointer + click events, so
 * the select opens the way a user experiences it.
 */
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];

describe('SSelect (e2e)', () => {
  it('opens the listbox and selects an option by click', async () => {
    const { unmount } = renderComponent(SSelect, {
      props: { items, placeholder: 'Pick fruit' }
    });

    const trigger = page.getByRole('combobox');
    await userEvent.click(trigger);

    await expect.element(page.getByRole('listbox')).toBeVisible();
    await expect.element(page.getByRole('option', { name: 'Banana' })).toBeVisible();

    await userEvent.click(page.getByRole('option', { name: 'Banana' }));

    // The trigger now reflects the selected label.
    await expect.element(trigger).toHaveTextContent('Banana');

    unmount();
  });

  it('selects an option via keyboard', async () => {
    const { unmount } = renderComponent(SSelect, {
      props: { items, placeholder: 'Pick fruit' }
    });

    const trigger = page.getByRole('combobox');
    await userEvent.click(trigger);
    await expect.element(page.getByRole('listbox')).toBeVisible();

    // Navigate with Arrow keys and confirm with Enter. We do not assert the exact
    // landing option (initial highlight varies); we only assert that SOME option
    // was committed — i.e. the trigger no longer shows the placeholder.
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    await expect.element(trigger).not.toHaveTextContent('Pick fruit');

    unmount();
  });

  it('has no a11y violations when paired with a label (with theme)', async () => {
    const { unmount } = renderComponent(
      {
        components: { SSelect },
        data: () => ({ items }),
        template: `
          <div>
            <label for="sel-trigger">Fruit</label>
            <SSelect
              :items="items"
              :trigger-props="{ id: 'sel-trigger', 'aria-label': 'Fruit' }"
              placeholder="Pick fruit"
            />
          </div>
        `
      },
      { withTheme: true }
    );

    // `region` is a page-level best-practice rule: the bare test page has no
    // landmark elements, so it flags every component scanned from `body`.
    const violations = await getA11yViolations(undefined, {
      rules: { region: { enabled: false } }
    });
    expect(violations).toHaveLength(0);
    unmount();
  });
});
