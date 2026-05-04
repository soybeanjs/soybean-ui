import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SAvatar from '../../../src/components/avatar/avatar.vue';
import { getA11yViolations } from '../../shared/a11y';
import { delay, setupMockImage, TEST_DELAYS } from '../../shared';

describe('SAvatar', () => {
  describe('rendering', () => {
    it('renders the default image and fallback slots', () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/avatar.png',
          fallbackLabel: 'JD'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="root"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="image"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="fallback"]').text()).toBe('JD');

      wrapper.unmount();
      cleanupImage();
    });

    it('applies custom class to the root element', () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/avatar.png',
          class: 'my-avatar'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="root"]').classes()).toContain('my-avatar');

      wrapper.unmount();
      cleanupImage();
    });

    it('renders custom fallback slot content', () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/error-avatar.png',
          fallbackLabel: 'JD'
        },
        slots: {
          fallback: '<span data-testid="custom-fallback">Avatar fallback</span>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-testid="custom-fallback"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Avatar fallback');

      wrapper.unmount();
      cleanupImage();
    });
  });

  describe('loading state', () => {
    it('emits loadingStatusChange and hides fallback after the image loads', async () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/avatar.png',
          fallbackLabel: 'JD'
        },
        attachTo: document.body
      });

      await delay(TEST_DELAYS.IMAGE_LOAD);
      await nextTick();

      expect(wrapper.emitted('loadingStatusChange')?.at(-1)).toEqual(['loaded']);
      expect(wrapper.find('[data-slot="fallback"]').exists()).toBe(false);
      expect((wrapper.find('[data-slot="image"]').element as HTMLImageElement).src).toContain('avatar.png');

      wrapper.unmount();
      cleanupImage();
    });

    it('keeps fallback visible and emits error when the image fails to load', async () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/error-avatar.png',
          fallbackLabel: 'JD'
        },
        attachTo: document.body
      });

      await delay(TEST_DELAYS.IMAGE_LOAD);
      await nextTick();

      expect(wrapper.emitted('loadingStatusChange')?.at(-1)).toEqual(['error']);
      expect(wrapper.find('[data-slot="fallback"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="fallback"]').text()).toBe('JD');

      wrapper.unmount();
      cleanupImage();
    });

    it('delays fallback rendering when delayMs is set', async () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/error-avatar.png',
          fallbackLabel: 'JD',
          delayMs: 40
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="fallback"]').exists()).toBe(false);

      await delay(60);
      await nextTick();

      expect(wrapper.find('[data-slot="fallback"]').exists()).toBe(true);

      wrapper.unmount();
      cleanupImage();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the fallback state', async () => {
      const cleanupImage = setupMockImage();

      const wrapper = mount(SAvatar, {
        props: {
          src: 'https://example.com/error-avatar.png',
          fallbackLabel: 'JD'
        },
        attachTo: document.body
      });

      await delay(TEST_DELAYS.IMAGE_LOAD);
      await nextTick();

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
      cleanupImage();
    });
  });
});
