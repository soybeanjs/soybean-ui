import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import SProgress from '../../../src/components/progress/progress.vue';
import { progress } from '../../../src/components/progress';
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
