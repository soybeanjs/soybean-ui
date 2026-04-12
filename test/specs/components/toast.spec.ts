import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toaster, toast } from '../../../src/components/toast';

afterEach(() => {
  vi.useRealTimers();
});

describe('Toaster', () => {
  it('pre-renders toast containers for all positions', () => {
    const wrapper = mount(Toaster);

    expect(wrapper.findAll('[data-slot=toaster]')).toHaveLength(6);
    expect(wrapper.find('[data-slot=toaster][data-y-position="top"][data-x-position="right"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot=toaster][data-y-position="top"][data-x-position="left"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot=toaster][data-y-position="top"][data-x-position="center"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot=toaster][data-y-position="bottom"][data-x-position="right"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot=toaster][data-y-position="bottom"][data-x-position="left"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot=toaster][data-y-position="bottom"][data-x-position="center"]').exists()).toBe(true);

    wrapper.unmount();
  });

  it('focuses the first active toast position when hotkey is pressed', async () => {
    vi.useFakeTimers();

    const wrapper = mount(Toaster, {
      attachTo: document.body,
      props: {
        id: 'hotkey-test',
        position: 'top-right',
        hotkey: ['altKey', 'KeyT']
      }
    });

    const toastId = toast('Bottom left toast', {
      toasterId: 'hotkey-test',
      position: 'bottom-left',
      duration: Infinity
    });

    await vi.runAllTimersAsync();
    await nextTick();

    document.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, code: 'KeyT' }));
    await nextTick();

    const targetList = wrapper.find('[data-slot=toaster][data-y-position="bottom"][data-x-position="left"]');

    expect(document.activeElement).toBe(targetList.element);

    toast.dismiss(toastId);
    await vi.runAllTimersAsync();
    wrapper.unmount();
  });
});
