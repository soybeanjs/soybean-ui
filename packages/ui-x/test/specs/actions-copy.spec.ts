import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SxActionsCopy from '@/components/actions-copy/actions-copy.vue';

describe('SxActionsCopy', () => {
  it('renders the copy label', () => {
    const wrapper = mount(SxActionsCopy, { props: { text: 'hello' } });

    expect(wrapper.text()).toContain('Copy');
  });

  it('calls clipboard and emits onCopy on click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    const onCopy = vi.fn();
    const wrapper = mount(SxActionsCopy, { props: { text: 'hello', onCopy } });

    await wrapper.find('button').trigger('click');
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(onCopy).toHaveBeenCalledWith('hello');
    expect(wrapper.text()).toContain('Copied');
  });
});
