import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { SToastProvider, toast } from '@/components/toast';

afterEach(() => {
  vi.useRealTimers();
});

describe('Toaster', () => {
  it('pre-renders toast containers for all positions', () => {
    const wrapper = mount(SToastProvider);

    expect(wrapper.findAll('[data-soybean-toaster]')).toHaveLength(6);
    expect(wrapper.find('[data-soybean-toaster][data-y-position="top"][data-x-position="right"]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-toaster][data-y-position="top"][data-x-position="left"]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-toaster][data-y-position="top"][data-x-position="center"]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-toaster][data-y-position="bottom"][data-x-position="right"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-soybean-toaster][data-y-position="bottom"][data-x-position="left"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-soybean-toaster][data-y-position="bottom"][data-x-position="center"]').exists()).toBe(
      true
    );

    wrapper.unmount();
  });

  it('focuses the first active toast position when hotkey is pressed', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SToastProvider, {
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

    const targetList = wrapper.find('[data-soybean-toaster][data-y-position="bottom"][data-x-position="left"]');

    expect(document.activeElement).toBe(targetList.element);

    toast.dismiss(toastId);
    await vi.runAllTimersAsync();
    wrapper.unmount();
  });

  it('renders a toast created via the imperative API and dismisses it', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SToastProvider, {
      attachTo: document.body,
      props: { id: 'render-test' }
    });

    const toastId = toast('Hello toast', {
      toasterId: 'render-test',
      duration: Infinity
    });

    await vi.runAllTimersAsync();
    await nextTick();

    const toastElement = wrapper.find('[data-soybean-toast]');
    expect(toastElement.exists()).toBe(true);
    expect(toastElement.text()).toContain('Hello toast');

    toast.dismiss(toastId);
    await vi.runAllTimersAsync();
    await nextTick();

    expect(wrapper.find('[data-soybean-toast]').exists()).toBe(false);

    wrapper.unmount();
  });

  it('announces toast title and description as plain text (not JSON)', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SToastProvider);

    const toastId = toast('Scheduled: Catch up', {
      description: 'A plain text description',
      duration: Infinity
    });

    await vi.runAllTimersAsync();
    await nextTick();

    const toastNode = wrapper.find('[data-soybean-toast]');
    expect(toastNode.exists()).toBe(true);

    const text = toastNode.text();
    expect(text).toContain('Scheduled: Catch up');
    expect(text).toContain('A plain text description');

    // The aria-live region must announce readable text, never a
    // JSON-stringified array (e.g. `["Scheduled: Catch up"]`).
    expect(text).not.toMatch(/[[\]"]/);

    toast.dismiss(toastId);
    await vi.runAllTimersAsync();
    wrapper.unmount();
  });
});
