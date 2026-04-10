import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SProgress from '../../../src/components/progress/progress.vue';
import SLoadingBar from '../../../src/components/progress/loading-bar.vue';
import { useLoadingBar } from '../../../src/components/progress/context';
import { getA11yViolations } from '../../shared/a11y';

describe('SProgress', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders progressbar semantics and custom class', () => {
      const wrapper = mount(SProgress, {
        props: {
          class: 'my-progress',
          modelValue: 45
        },
        attachTo: document.body
      });

      const progressbar = wrapper.get('[role="progressbar"]');

      expect(progressbar.classes()).toContain('my-progress');
      expect(progressbar.attributes('aria-valuenow')).toBe('45');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SProgress, {
        props: {
          modelValue: 45
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});

describe('useLoadingBar', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the loading bar on start and hides it after finish', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SLoadingBar, {
      attachTo: document.body
    });

    const loadingBar = useLoadingBar();

    loadingBar.start();
    await nextTick();

    const started = document.body.querySelector('[role="progressbar"]');

    expect(started).not.toBeNull();
    expect(started?.getAttribute('aria-valuenow')).toBe('8');

    loadingBar.finish();
    await nextTick();

    const finished = document.body.querySelector('[role="progressbar"]');

    expect(finished?.getAttribute('aria-valuenow')).toBe('100');

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.body.querySelector('[role="progressbar"]')).toBeNull();
    wrapper.unmount();
  });

  it('switches to the error color when error is called', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SLoadingBar, {
      attachTo: document.body
    });

    const loadingBar = useLoadingBar();

    loadingBar.error();
    await nextTick();

    expect(document.body.querySelector('.bg-destructive')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    wrapper.unmount();
  });
});
