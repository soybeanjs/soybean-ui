import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getProgressIndicatorStyle } from '../../../headless/src/components/progress/shared';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import SProgress from '../../../src/components/progress/progress.vue';
import { useLoadingBar } from '../../../src/components/progress/context';
import { getA11yViolations } from '../../shared/a11y';

describe('SProgress', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders progressbar semantics and custom class', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SProgress },
          template: `
          <SConfigProvider>
            <SProgress class="my-progress" :model-value="45" />
          </SConfigProvider>
        `
        },
        {
          attachTo: document.body
        }
      );

      const progressbar = wrapper.get('[role="progressbar"]');

      expect(progressbar.classes()).toContain('my-progress');
      expect(progressbar.attributes('aria-valuenow')).toBe('45');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SProgress },
          template: `
          <SConfigProvider>
            <SProgress :model-value="45" />
          </SConfigProvider>
        `
        },
        {
          attachTo: document.body
        }
      );

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});

describe('getProgressIndicatorStyle', () => {
  it('returns undefined for null progress', () => {
    expect(getProgressIndicatorStyle(null)).toBeUndefined();
  });

  it('returns the LTR transform for determinate progress', () => {
    expect(getProgressIndicatorStyle(60, 'ltr')).toEqual({
      transform: 'translateX(-40%)'
    });
  });

  it('returns the RTL transform for determinate progress', () => {
    expect(getProgressIndicatorStyle(60, 'rtl')).toEqual({
      transform: 'translateX(40%)'
    });
  });
});

describe('useLoadingBar', () => {
  afterEach(() => {
    // Reset the singleton observer so each test starts from a clean pre-mount state.
    useLoadingBar().clear();
    vi.useRealTimers();
  });

  it('shows the loading bar on start and hides it after finish', async () => {
    vi.useFakeTimers();

    const wrapper = mount(
      {
        components: { SConfigProvider },
        template: `
        <SConfigProvider>
          <div />
        </SConfigProvider>
      `
      },
      {
        attachTo: document.body
      }
    );

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

  it('can be used before the loading bar provider mounts', async () => {
    vi.useFakeTimers();

    const loadingBar = useLoadingBar();

    loadingBar.start();

    const wrapper = mount(
      {
        components: { SConfigProvider },
        template: `
        <SConfigProvider>
          <div />
        </SConfigProvider>
      `
      },
      {
        attachTo: document.body
      }
    );

    await nextTick();

    const progressbar = document.body.querySelector('[role="progressbar"]');

    expect(progressbar).not.toBeNull();
    expect(progressbar?.getAttribute('aria-valuenow')).toBe('8');

    loadingBar.finish();
    await nextTick();

    expect(progressbar?.getAttribute('aria-valuenow')).toBe('100');

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.body.querySelector('[role="progressbar"]')).toBeNull();
    wrapper.unmount();
  });

  it('switches to the error color when error is called', async () => {
    vi.useFakeTimers();

    const wrapper = mount(
      {
        components: { SConfigProvider },
        template: `
        <SConfigProvider>
          <div />
        </SConfigProvider>
      `
      },
      {
        attachTo: document.body
      }
    );

    const loadingBar = useLoadingBar();

    loadingBar.error();
    await nextTick();

    const indicator = document.body.querySelector('[data-slot="indicator"]');

    expect(indicator).not.toBeNull();
    expect(indicator?.getAttribute('class')).toContain('data-[status=error]:bg-destructive');
    expect(document.body.querySelector('[data-status="error"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    wrapper.unmount();
  });
});
