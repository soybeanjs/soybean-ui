import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import SCombobox from '@/components/combobox/combobox.vue';
import { renderComponent } from '../../shared/render';

/**
 * Combobox e2e — real pointer interactions + real portal and focus behavior
 * that the happy-dom unit spec (`packages/ui/test/specs/components/combobox.spec.ts`)
 * has to simulate.
 *
 * The key scenario pins the associated-`<label>` regression in
 * `ComboboxContentImpl`: interacting with a `<label>` that points (via `for`) at
 * a control inside the combobox must not dismiss the open content. The fix's
 * `isEventTargetWithinCombobox` treats the label's associated control as "inside
 * the combobox", so the `pointerdown-outside` dismiss is prevented and the
 * listbox stays open.
 */
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];

describe('SCombobox (e2e)', () => {
  it('opens the listbox on trigger click and shows the items', async () => {
    const { unmount } = renderComponent(SCombobox, {
      props: { items, placeholder: 'Pick fruit' }
    });

    await userEvent.click(page.getByRole('button', { name: 'Pick fruit' }));

    await expect.element(page.getByRole('listbox')).toBeVisible();
    await expect.element(page.getByRole('option', { name: 'Banana' })).toBeVisible();

    unmount();
  });

  it('keeps the listbox open when interacting with an associated label', async () => {
    const { unmount } = renderComponent({
      name: 'ComboboxLabelWrapper',
      components: { SCombobox },
      data: () => ({ items }),
      template: `
          <div>
            <label for="combobox-input">Fruit</label>
            <SCombobox
              :items="items"
              :input-props="{ controlProps: { id: 'combobox-input' } }"
              placeholder="Pick fruit"
            />
          </div>
        `
    });

    // Open the combobox via its trigger button.
    await userEvent.click(page.getByRole('button', { name: 'Pick fruit' }));
    await expect.element(page.getByRole('listbox')).toBeVisible();

    // The label is outside the combobox root, so a pointerdown on it would
    // normally dismiss the content. With the fix, the label's associated control
    // (the combobox input) counts as "inside", so the listbox stays open.
    await userEvent.click(page.getByText('Fruit', { exact: true }));

    await expect.element(page.getByRole('listbox')).toBeVisible();
    await expect.element(page.getByRole('option', { name: 'Apple' })).toBeVisible();

    unmount();
  });
});
