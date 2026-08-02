import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';
import STextarea from '@/components/textarea/textarea.vue';
import { getA11yViolations } from '../../shared/a11y';
import { renderComponent } from '../../shared/render';

/**
 * Textarea e2e — real layout measurements happy-dom cannot reproduce.
 *
 * `autosize` reads `scrollHeight` / `getComputedStyle` (padding, line-height)
 * and mutates the inline `height` / `overflow-y`. happy-dom has no layout
 * engine, so the unit spec only asserts the reactive inline styles. This spec
 * runs in a real browser where `offsetHeight` actually grows with content and
 * `maxRows` caps it with a scrollbar.
 */

function renderTextarea(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
  return renderComponent(STextarea, { props, slots });
}

async function textareaHeight(locator: Locator) {
  const el = await locator.element();
  return (el as HTMLTextAreaElement).offsetHeight;
}

describe('STextarea (e2e)', () => {
  it('auto-grows to fit its initial value and grows further as content is typed', async () => {
    const { unmount } = renderTextarea({ autosize: true, placeholder: 'Type here' });

    const textarea = page.getByPlaceholder('Type here');
    await expect.element(textarea).toBeVisible();

    // Initial height: autosize sets inline height to content height on mount.
    const initialHeight = await textareaHeight(textarea);

    await userEvent.type(textarea, 'line one\nline two\nline three\nline four');

    // The post-flush autosize watcher measures and applies the new height.
    await vi.waitFor(async () => {
      expect(await textareaHeight(textarea)).toBeGreaterThan(initialHeight);
    });

    unmount();
  });

  it('caps the height at maxRows and turns the textarea scrollable', async () => {
    const { unmount } = renderTextarea({
      autosize: { maxRows: 3 },
      placeholder: 'Type here'
    });

    const textarea = page.getByPlaceholder('Type here');
    await expect.element(textarea).toBeVisible();

    // Exceed the 3-row cap with many wrapped lines.
    await userEvent.type(textarea, 'x'.repeat(1000));

    await vi.waitFor(async () => {
      const el = (await textarea.element()) as HTMLTextAreaElement;
      expect(el.style.overflowY).toBe('auto');
    });
    const cappedHeight = await textareaHeight(textarea);

    // Typing even more content must not grow past the cap.
    await userEvent.type(textarea, 'x'.repeat(1000));
    await vi.waitFor(async () => {
      expect(await textareaHeight(textarea)).toBe(cappedHeight);
    });

    unmount();
  });

  it('updates the counter live while typing', async () => {
    const { unmount } = renderTextarea({ showCounter: true, maxlength: 20 });

    await userEvent.type(page.getByRole('textbox'), 'hello');

    await expect.element(page.getByText('5 / 20')).toBeVisible();

    unmount();
  });

  it('clears the value through the clear trigger', async () => {
    const { unmount } = renderTextarea({ clearable: true, defaultValue: 'hello' });

    const textarea = page.getByRole('textbox');
    await expect.element(textarea).toHaveValue('hello');

    await userEvent.click(page.getByRole('button', { name: 'Clear textarea' }));

    await expect.element(textarea).toHaveValue('');

    unmount();
  });

  it('has no a11y violations with a labelled textarea (with theme)', async () => {
    const Wrapper = defineComponent({
      name: 'TextareaA11yWrapper',
      setup() {
        return () =>
          h('div', [
            h('label', { for: 'e2e-textarea' }, 'Description'),
            h(STextarea, { id: 'e2e-textarea', clearable: true, showCounter: true, maxlength: 20, modelValue: 'hello' })
          ]);
      }
    });

    const { unmount } = renderComponent(Wrapper, { withTheme: true });

    // `region` is a page-level best-practice rule: the bare test page has no
    // landmark elements, so it flags every component scanned from `body`.
    const violations = await getA11yViolations(undefined, {
      rules: { region: { enabled: false } }
    });
    expect(violations).toHaveLength(0);

    unmount();
  });
});
