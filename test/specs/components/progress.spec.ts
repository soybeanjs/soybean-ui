import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import SProgress from '../../../src/components/progress/progress.vue';
import { progress } from '../../../src/components/progress';
import SProgressProvider from '../../../src/components/progress/progress-provider.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SProgress', () => {
  afterEach(() => {
    progress.reset();
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

describe('SProgressProvider', () => {
  afterEach(() => {
    progress.reset();
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the provider progressbar with the configured class', async () => {
      const wrapper = mount(SProgressProvider, {
        attachTo: document.body,
        props: {
          class: 'provider-progress'
        }
      });

      progress.start();
      await nextTick();

      const progressbar = document.body.querySelector('[role="progressbar"]');

      expect(progressbar).not.toBeNull();
      expect(progressbar?.classList.contains('provider-progress')).toBe(true);
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('shows the top progress bar on start and hides it after done', async () => {
      vi.useFakeTimers();

      const wrapper = mount(
        {
          components: { SConfigProvider },
          template: `
            <SConfigProvider :progress="{ speed: 10 }">
              <div />
            </SConfigProvider>
          `
        },
        {
          attachTo: document.body
        }
      );

      progress.start();
      await nextTick();

      const started = document.body.querySelector('[role="progressbar"]');

      expect(started).not.toBeNull();
      expect(started?.getAttribute('aria-valuenow')).toBe('0.08');

      progress.done();
      await nextTick();

      const finished = document.body.querySelector('[role="progressbar"]');

      expect(finished?.getAttribute('aria-valuenow')).toBe('1');

      await vi.advanceTimersByTimeAsync(10);
      await nextTick();

      expect(document.body.querySelector('[role="progressbar"]')).toBeNull();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations while active', async () => {
      const wrapper = mount(SProgressProvider, {
        attachTo: document.body
      });

      progress.start();
      await nextTick();

      const progressbar = document.body.querySelector('[role="progressbar"]');

      expect(progressbar).not.toBeNull();

      const violations = await getA11yViolations(progressbar as Element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
