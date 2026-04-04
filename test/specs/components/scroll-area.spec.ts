import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SScrollArea from '../../../src/components/scroll-area/scroll-area.vue';
import { getA11yViolations } from '../../shared/a11y';

function mockOverflowMetrics(wrapper: VueWrapper) {
  const viewport = wrapper.find('[data-soybean-scroll-area-viewport]').element as HTMLElement;
  const content = viewport.firstElementChild;
  const scrollbars = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');

  if (!(content instanceof HTMLElement) || scrollbars.length < 2) {
    throw new Error('ScrollArea test elements are missing.');
  }

  const verticalScrollbar = scrollbars[0].element as HTMLElement;
  const horizontalScrollbar = scrollbars[1].element as HTMLElement;

  Object.defineProperties(viewport, {
    clientHeight: { configurable: true, value: 120 },
    clientWidth: { configurable: true, value: 180 },
    scrollHeight: { configurable: true, value: 360 },
    scrollWidth: { configurable: true, value: 420 },
    scrollTop: { configurable: true, writable: true, value: 24 },
    scrollLeft: { configurable: true, writable: true, value: 36 }
  });

  Object.defineProperties(content, {
    offsetHeight: { configurable: true, value: 360 },
    offsetWidth: { configurable: true, value: 420 },
    scrollHeight: { configurable: true, value: 360 },
    scrollWidth: { configurable: true, value: 420 }
  });

  Object.defineProperties(verticalScrollbar, {
    clientHeight: { configurable: true, value: 120 },
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 0, width: 10, height: 120, right: 10, bottom: 120 })
    }
  });

  Object.defineProperties(horizontalScrollbar, {
    clientWidth: { configurable: true, value: 180 },
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 0, width: 180, height: 10, right: 180, bottom: 10 })
    }
  });

  viewport.dispatchEvent(new Event('scroll'));
}

describe('SScrollArea', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SScrollArea, {
        props: { class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Scrollable Content');
      expect(wrapper.classes()).toContain('h-40');
      wrapper.unmount();
    });

    it('renders viewport and both scrollbars', () => {
      const wrapper = mount(SScrollArea, {
        props: { class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-scroll-area-viewport]').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-scroll-area-scrollbar]')).toHaveLength(2);
      wrapper.unmount();
    });
  });

  describe('visibility state', () => {
    it('shows scrollbars when type is always and content overflows', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'always', class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const [verticalScrollbar, horizontalScrollbar] = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');
      expect(verticalScrollbar.attributes('data-state')).toBe('visible');
      expect(horizontalScrollbar.attributes('data-state')).toBe('visible');
      wrapper.unmount();
    });

    it('keeps hover scrollbars hidden before interaction', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'hover', class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const [verticalScrollbar] = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');
      expect(verticalScrollbar.attributes('data-state')).toBe('hidden');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'always', class: 'h-40 w-40' },
        slots: { default: '<div class="h-80 w-80">Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
