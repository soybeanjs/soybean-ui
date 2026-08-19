import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SImage from '@/components/image/image.vue';
import { getA11yViolations } from '../../shared/a11y';

function mockImageStatus(status: 'loaded' | 'error') {
  class MockImage {
    private listeners: Record<string, () => void> = {};

    set src(value: string) {
      this.listeners[status === 'loaded' ? 'load' : 'error']?.();
    }

    get src() {
      return '';
    }

    addEventListener(type: string, callback: () => void) {
      this.listeners[type] = callback;
    }

    removeEventListener() {}
  }

  // @ts-expect-error happy-dom image mock
  window.Image = MockImage;
  // @ts-expect-error happy-dom image mock
  globalThis.Image = MockImage;
}

describe('SImage', () => {
  describe('rendering', () => {
    it('renders an img with the source', () => {
      mockImageStatus('loaded');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png', alt: 'A picture' },
        attachTo: document.body
      });

      const img = wrapper.find('img');

      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/a.png');
      expect(img.attributes('alt')).toBe('A picture');

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png', class: 'my-image' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-image-root]').classes()).toContain('my-image');

      wrapper.unmount();
    });

    it('reflects the fit variant class on the image', () => {
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png', fit: 'contain' },
        attachTo: document.body
      });

      expect(wrapper.find('img').classes()).toContain('object-contain');

      wrapper.unmount();
    });
  });

  describe('loading state', () => {
    it('reflects data-status loaded after load', async () => {
      mockImageStatus('loaded');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png' },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(wrapper.find('[data-soybean-image-root]').attributes('data-status')).toBe('loaded');

      wrapper.unmount();
    });

    it('shows the fallback source on error', async () => {
      mockImageStatus('error');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/broken.png', fallback: 'https://example.com/fallback.png' },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(wrapper.find('[data-soybean-image-root]').attributes('data-status')).toBe('error');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/fallback.png');

      wrapper.unmount();
    });
  });

  describe('preview', () => {
    it('opens the preview when a loaded image is clicked', async () => {
      mockImageStatus('loaded');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png', preview: true },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));
      await wrapper.find('img').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.querySelector('[data-soybean-image-preview]')).toBeTruthy();

      wrapper.unmount();
    });

    it('does not open the preview when preview is disabled', async () => {
      mockImageStatus('loaded');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png' },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));
      await wrapper.find('img').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.querySelector('[data-soybean-image-preview]')).toBeNull();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      mockImageStatus('loaded');
      const wrapper = mount(SImage, {
        props: { src: 'https://example.com/a.png', alt: 'A picture' },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
